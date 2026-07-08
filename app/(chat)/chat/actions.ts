"use server";

import axios from "axios";
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export async function addMessageToQueue(chatInput: string, sessionId?: string) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) throw new Error("Thiếu N8N_WEBHOOK_URL trong .env");

  const res = await axios.post(url, {
    chatInput,
    sessionId,
  });
  console.log("Webhook response:", res.data);

  return {
    jobId: res.data.jobId,
    sessionId: res.data.sessionId,
  };
}

export async function checkJobStatus(jobId: string) {
  const url = process.env.N8N_STATUS_URL;
  if (!url) throw new Error("Thiếu N8N_STATUS_URL trong .env");

  const res = await axios.get(url, { params: { jobId: jobId } });
  console.log(res.data);
  console.log(Array.isArray(res.data));

  return res.data;
}
