'use client'

import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import axios from 'axios'

export default function Home() {

  const [ollamaRes, setOllamaRes] = useState("")

  const postRequest = async () => {
    try
    {
      const res = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "gemma3:1b",
          prompt: "hey, how are you? answer in 1 word",
          stream: false
        }
      )

      setOllamaRes(res.data.response)
      console.log(res.data.response)

    } catch (err: any)
    {
      console.log(err.response?.status, err.response?.data)
    }
  }

  useEffect(() => {
    postRequest()
  }, [])

  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  function keepInputFocus() {
    inputRef.current?.focus()
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.terminalContainer}>

          <div className={styles.responseContainer}>
          </div>

          <div className={styles.inputContainer}>
            <textarea className={styles.requestInput} rows={1} ref={inputRef} autoFocus onBlur={keepInputFocus} />
          </div>

        </div>
      </div>
    </>
  );
}
