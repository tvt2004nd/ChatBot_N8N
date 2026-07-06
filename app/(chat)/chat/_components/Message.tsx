"use client";
import { useEffect, useState, useRef } from "react";
import { postMessage, getHistoryMessage, HistoryItem } from "@/lib/chat";
import style from "../../../../style/chat.module.css";
export default function Message() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = "test-123";

  useEffect(() => {
    let clean = false;
    async function getHistory() {
      const data = await getHistoryMessage(sessionId);
      if (!clean) {
        setHistory(data);
      }
    }
    getHistory();
    return () => {
      clean = true;
    };
  }, []);

  const getInput = (text: string) => {
    return setInput(text);
  };
  const submitMessage = async () => {
    if (!input.trim()) return;
    await postMessage(input, sessionId);
    const data = await getHistoryMessage(sessionId);
    setHistory(data);
    setInput("");
    inputRef.current?.focus();
  };

  console.log(history);
  return (
    <div className={style.mainChat}>
      <h1>Chat bot APP</h1>
      <div className={style.history}>
        {history.map((item) => (
          <div key={item.id} className={`${style.messageRow} ${item.role === "human" ? style.human : style.ai}`}>
            <div className={style.bubble}>{item.content}</div>
          </div>
        ))}
      </div>
      <div className={style.inputArea}>
        <input
          type="text"
          value={input}
          ref={inputRef}
          className={style.inputField}
          placeholder="Nhập tin nhắn..."
          onChange={(e) => getInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitMessage();
          }}
        />
        <button className={style.sendButton} onClick={submitMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
}
