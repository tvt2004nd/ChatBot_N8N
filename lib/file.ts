"use server";
import axios from "axios";
axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export type FileItem = {
  file_id: string;
  file_name: string;
  modified_time: Date;
  source_url: string;
  trashed?: boolean; // Google Drive: file có trong thùng rác không
  isUploading?: boolean; // Cờ theo dõi trạng thái đang upload
};

export default async function getAllFile(): Promise<FileItem[]> {
  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("không tìm thấy url");
  }
  try {
    const res = await axios.get(url);
    let raw = res.data;

    // Log để debug — xem N8N thực sự trả về gì
    console.log(
      "[getAllFile] raw response:",
      JSON.stringify(raw).slice(0, 500),
    );

    // Normalize: N8N đôi khi bọc trong { data: [...] } hoặc trả mảng lồng [[...]]
    if (raw && !Array.isArray(raw) && Array.isArray(raw.data)) {
      raw = raw.data;
    }
    if (Array.isArray(raw) && raw.length > 0 && Array.isArray(raw[0])) {
      raw = raw.flat();
    }

    if (!Array.isArray(raw)) raw = [];

    const active = raw.filter((item: FileItem) => item?.trashed !== true);

    const seen = new Set<string>();
    const unique: FileItem[] = [];
    for (const item of active) {
      if (item?.file_id && !seen.has(item.file_id)) {
        seen.add(item.file_id);
        unique.push(item);
      }
    }

    console.log(
      `[getAllFile] raw: ${raw.length} | trashed bị lọc: ${raw.length - active.length} | hiển thị: ${unique.length}`,
    );
    return unique;
  } catch (err) {
    console.error("Lỗi getAllFile:", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message || "Lỗi khi lấy danh sách file");
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}
export async function uploadFile(formData: FormData) {
  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("Không tìm thấy url");
  }

  try {
    const res = await axios.post(url, formData);
    return res.data;
  } catch (error) {
    console.error("Lỗi upload file:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || error.message || "Lỗi khi upload file" };
    }
    return { error: error instanceof Error ? error.message : "Lỗi không xác định" };
  }
}

export async function deleteFile(fileId: string) {
  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("Không tìm thấy url");
  }

  try {
    const res = await axios.delete(url, { data: { file_id: fileId } });
    return res.data;
  } catch (error) {
    console.error("Lỗi xóa file:", error);
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || error.message || "Lỗi khi xóa file" };
    }
    return { error: error instanceof Error ? error.message : "Lỗi không xác định" };
  }
}
