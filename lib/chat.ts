"use server";
import axios from "axios";

axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
import { NextRequest, NextResponse } from "next/server";


export type HistoryItem = {
  id: number;
  role: string;
  sessionId: string;
  content: string;
  created_at: Date;
};
export async function getHistoryMessage(
  sessionId?: string,
): Promise<HistoryItem[]> {
  const url = process.env.N8N_HISTORY_CHAT_URL;

  if (!url) {
    throw new Error("Thiếu N8N_HISTORY_CHAT_URL trong .env");
  }

  try {
    const res = await axios.get(url, {
      params: { sessionId },
    });

    let data = res.data;
    
    // N8N often returns wrapped arrays or objects
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      data = data[0];
    }
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (Array.isArray(data.data)) data = data.data;
      else if (Array.isArray(data.history)) data = data.history;
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
