"use server";
import axios from "axios";
axios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export type sessionItem = {
  id: string;
  title: string;
  created_at: string;
};
export default async function getAllSession(): Promise<sessionItem[]> {
  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }
  try {
    const res = await axios(url);

    let data = res.data;
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      data = data[0];
    }
    if (data && typeof data === "object" && !Array.isArray(data)) {
      if (Array.isArray(data.data)) data = data.data;
    }

    if (Array.isArray(data)) {
      data.sort((a, b) => {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return timeB - timeA;
      });
      return data;
    }
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
export async function updateTitle(
  sessionId: string,
  title: string,
): Promise<sessionItem> {
  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }
  try {
    const res = await axios.put(url, { sessionId, title });
    return res.data;
  } catch (err) {
    console.error("Lỗi updateTitle:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message || "Lỗi khi cập nhật tiêu đề");
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}
export async function deleteSession(sessionId: string): Promise<sessionItem> {
  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }
  try {
    const res = await axios.delete(url, { data: { sessionId } });
    return res.data;
  } catch (err) {
    console.error("Lỗi deleteSession:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message || "Lỗi khi xóa session");
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}
