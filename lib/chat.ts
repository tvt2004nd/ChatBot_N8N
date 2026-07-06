import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export type HistoryItem = {
  id: number;
  role: string;
  sessionId: string;
  content: string;
  created_at: Date;
};
export async function postMessage(chatInput: string, sessionId: string) {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
      chatInput: chatInput,
      sessionId: sessionId,
    });
    const data = res.data;
    return data;
  } catch (err) {
    throw err;
  }
}
export async function getHistoryMessage(sessionId: string) {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_N8N_HISTORY_CHAT_URL!, {
      params: {
        sessionId,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
}
