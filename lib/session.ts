"use server";

import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
// types/session.ts
export interface SessionItem {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
}

export default async function getAllSession(): Promise<SessionItem[]> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Chưa đăng nhập hoặc phiên đã hết hạn");
  }

  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }

  try {
    const res = await axios.get(url, { params: { userId: user.userId, role: user.role } });

    let data = res.data;
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      data = data[0];
    }
    if (data && typeof data === "object" && !Array.isArray(data)) {
      if (Array.isArray(data.data)) data = data.data;
    }

    if (Array.isArray(data)) {
      // Chỉ giữ lại những item có id hợp lệ (tránh trường hợp N8N trả về mảng [{}] khi rỗng)
      const validData = data.filter(item => item && (item.id || item.sessionId || item.session_id));

      const mappedData = validData.map((item) => ({
        ...item,
        id: item.id || item.sessionId || item.session_id,
      }));

      // Lọc trùng lặp ID
      const seen = new Set();
      const uniqueData = [];
      for (const item of mappedData) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          uniqueData.push(item);
        }
      }

      uniqueData.sort((a: SessionItem, b: SessionItem) => {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return timeB - timeA;
      });
      return uniqueData;
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
): Promise<SessionItem> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Chưa đăng nhập hoặc phiên đã hết hạn");
  }

  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }

  try {
    const res = await axios.put(url, { sessionId, title, userId: user.userId });
    return res.data;
  } catch (err) {
    console.error("Lỗi updateTitle:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          "Lỗi khi cập nhật tiêu đề",
      );
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}

export async function deleteSession(sessionId: string): Promise<SessionItem> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Chưa đăng nhập hoặc phiên đã hết hạn");
  }

  const url = process.env.N8N_SESSION_CHAT;
  if (!url) {
    throw new Error("không tìm thấy đường dẫn");
  }

  try {
    const res = await axios.delete(url, {
      data: { sessionId, userId: user.userId },
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi deleteSession:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || err.message || "Lỗi khi xóa session",
      );
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}
