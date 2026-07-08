"use client";
import { useEffect, useState, useRef } from "react";
import { addMessageToQueue, checkJobStatus } from "../actions";
import { getHistoryMessage, HistoryItem } from "@/lib/chat";
import style from "../../../../style/chat.module.css";
import { useRouter } from "next/navigation";

type props = {
  sessionId?: string;
};

export default function Message({ sessionId }: props) {
  const [input, setInput] = useState("");
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

    let clean = false;

    async function loadHistory() {
      const data = await getHistoryMessage(sessionId);
      if (!clean) {
        setHistory(data);
      }
    }

    loadHistory();

    return () => {
      clean = true;
    };
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, isProcessing]); // Scroll when processing state changes too

  const getInput = (text: string) => {
    return setInput(text);
  };
  useEffect(() => {
    console.log("History:", history);
  }, [history]);
  const submitMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const messageText = input;

    setInput("");
    inputRef.current?.focus();
    setIsProcessing(true);

    const tempMessage: HistoryItem = {
      id: Date.now(),
      role: "human",
      sessionId: sessionId ?? "",
      content: messageText,
      created_at: new Date(),
    };
    setHistory((prev) => [...prev, tempMessage]);

    try {
      const { jobId, sessionId: newSessionId } = await addMessageToQueue(
        messageText,
        sessionId,
      );

      const pollTimer = setInterval(async () => {
        const result = await checkJobStatus(jobId);

        if (result.status === "done") {
          clearInterval(pollTimer);

          const currentSessionId = sessionId ?? newSessionId;
          const data = await getHistoryMessage(currentSessionId);

          setHistory(data);
          setIsProcessing(false);

          if (!sessionId && newSessionId) {
            router.replace(`/chat/${newSessionId}`);
          }
        }

        if (result.status === "failed") {
          clearInterval(pollTimer);
          setIsProcessing(false);
        }
      }, 2000);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className={style.mainChat}>
      <h1>Chat bot APP</h1>
      <div className={style.history}>
        {(history ?? []).map((item) => (
          <div
            key={item.id}
            className={`${style.messageRow} ${item.role === "human" ? style.human : style.ai}`}
          >
            <div className={style.bubble}>{item.content}</div>
          </div>
        ))}
        {isProcessing && (
          <div className={`${style.messageRow} ${style.ai}`}>
            <div className={style.typingIndicator}>
              <div className={style.typingDot}></div>
              <div className={style.typingDot}></div>
              <div className={style.typingDot}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef}></div>
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
