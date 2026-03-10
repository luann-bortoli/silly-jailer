'use client'

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import axios from 'axios'
import { BASE_PROMPT, SECRET_WORD, PLAYER_CHANCES, AI_MODEL } from "./util/variables";

export default function Home() {

  const [userPrompt, setUserPrompt] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [prisonerChances, setprisonerChances] = useState(PLAYER_CHANCES)
  const [prisonerStatus, setprisonerStatus] = useState<'won' | 'lost' | 'in progress'>('in progress')

  const postRequest = async (prompt: string) => {
    try
    {
      const res = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: AI_MODEL,
          prompt: 'BASE PROMPT:' + BASE_PROMPT + '\n' + 'CHAT HISTORY:' + terminalHistory + '\n' + 'PROMPT:'+ prompt,
          stream: false
        }
      )

      setJaylerLoading(false)
      setTerminalHistory(prev => [...prev, "[JAYLER]:  " + res.data.response])

    } catch (err: any)
    {
      console.log(err.response?.status, err.response?.data)
    }
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  function keepInputFocus() {
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault()

    if(prisonerStatus != 'in progress') return

    if(jaylerLoading) return

    if(userPrompt == "") return

    if(prisonerChances > 1){
      setprisonerChances(prisonerChances -1)
      } else {
        setTerminalHistory(prev => [...prev, '[JAYLER]: Didn’t get the word, did you? Shame... the executioner’s waiting.'])
        setprisonerStatus('lost')
        setUserPrompt("")
      setprisonerChances(prisonerChances -1)
        return
      }

    setJaylerLoading(true)

    const prompt = '[PRISONER]:  ' + userPrompt.trim();
    if (!prompt) return

    setUserPrompt("")

    if (userPrompt.trim().toLowerCase().includes(SECRET_WORD.trim().toLowerCase())){
      setJaylerLoading(false)
      setprisonerStatus('won')
      setTerminalHistory(prev => [...prev, '[PRISONER]:  ' + userPrompt.trim(),'[JAYLER]: …Well I’ll be damned. You actually got it out of me. Take your victory and get out of my cellblock.'])
      return
  }

    setTerminalHistory(prev => [...prev, prompt])
    postRequest(prompt)

  }

  /*
   * Keeps the scroll at the bottom
   */

  const containerRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
  const el = containerRef.current
  if (!el) return

    el.scrollTop = el.scrollHeight
}, [terminalHistory])

  const [jaylerLoading, setJaylerLoading] = useState(false)

  const spinner = ["-", "\\", "|", "/"]
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setFrame(f => (f + 1) % spinner.length)
    }, 100)

    return () => clearInterval(id)

  }, [])

  return (
    <>
      <div className={styles.container}>
        
        <div className={styles.terminalTitle}>
          <p>● ● ●</p>
          <p>SILLY JAYLER v0.1.0</p>
          <p>{'☰'}</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className={styles.terminalContainer} ref={containerRef}>

          <div className={styles.rulesContainer}>
            <p>{'>'} STATUS: {prisonerStatus.toUpperCase()}</p>
            <p>{'>'} ATTEMPTS REMAINING: {prisonerChances}</p>
            <p>{'>'} CONNECTION: {prisonerStatus == 'in progress' ? 'ESTABLISHED' : 'TERMINATED'}</p>
          </div>

          <div className={styles.responseContainer}>
          
            <p className={styles.responseText}>[JAYLER]: Hmph… another inmate at my door. This should be disappointing.</p>

            {terminalHistory.map((message, index) => {
              return(
                <p key={index} className={styles.responseText}>{message}</p>
              )
            })}

            {jaylerLoading && <p style={{color: 'var(--primary)'}}>{'[JAYLER]:   '}{spinner[frame]}</p>}

          </div>

          <div className={styles.inputContainer}>
            <p style={{color: "var(--primary)", marginRight: "8px"}}>{'>>'}</p>
            <input className={styles.requestInput} value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} ref={inputRef} autoFocus onBlur={keepInputFocus} />
          </div>

        </form>
      </div>
    </>
  );
}
