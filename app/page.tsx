'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from 'axios'

export default function Home() {

  const [ollamaRes, setOllamaRes] = useState("")

  const postRequest = async () => {
  try {
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

  } catch (err: any) {
    console.log(err.response?.status, err.response?.data)
  }
}

  useEffect(() => {
    postRequest()
  },[])


  return (
    <>
    </>
  );
}
