"use server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
import { Readable } from "stream";
import { google } from "googleapis";
axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export type FileItem = {
  file_id: string;
  file_name: string;
  modified_time: Date;
  source_url: string;
  trashed?: boolean; // Google Drive: file có trong thùng rác không
  isUploading?: boolean; // Cờ theo dõi trạng thái đang upload
  isProcessing?: boolean; // Cờ theo dõi trạng thái đang xử lý bởi n8n
};
export type UploadedFile = {
  fileId: string;
  fileName: string;
  fileUrl: string;
};
function getDriveClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return google.drive({ version: "v3", auth: oauth2Client });
}

export async function uploadFileToDrive(
  formData: FormData,
): Promise<UploadedFile> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Bạn không có quyền upload file");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("Chưa chọn file");
  }

  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("File vượt quá dung lượng cho phép (20MB)");
  }

  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error("Thiếu GOOGLE_DRIVE_FOLDER_ID trong environment variables");
  }

  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("Không tìm thấy url");
  }

  try {
    const drive = getDriveClient();

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const res = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [folderId],
      },
      media: {
        mimeType: file.type || "application/octet-stream",
        body: stream,
      },
      fields: "id, name, webViewLink",
    });

    const result: UploadedFile = {
      fileId: res.data.id!,
      fileName: res.data.name!,
      fileUrl: res.data.webViewLink!,
    };

    // Đợi n8n xử lý xong thật sự (search, chunk, embedding, insert DB...)
    // Chạy ngầm (fire-and-forget) để frontend không bị đơ nếu n8n xử lý file lớn lâu hơn 5 phút.
    axios.post(url, result).catch((n8nErr) => {
      console.error("Lỗi n8n xử lý file sau upload:", n8nErr);
    });

    return result;
  } catch (err) {
    console.error("Lỗi upload lên Google Drive:", err);
    if (err instanceof Error) throw err; // giữ nguyên message cụ thể (vd lỗi n8n ở trên)
    throw new Error("Không thể tải file lên, vui lòng thử lại");
  }
}

export default async function getAllFile(): Promise<FileItem[]> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Chưa đăng nhập");

  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("không tìm thấy url");
  }
  try {
    const res = await axios.get(url, {
      params: { userId: user.userId, role: user.role },
    });
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
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          "Lỗi khi lấy danh sách file",
      );
    }
    throw new Error(err instanceof Error ? err.message : "Lỗi không xác định");
  }
}

export async function deleteFile(fileId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { error: "Bạn không có quyền xóa file" };

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
      return {
        error:
          error.response?.data?.message || error.message || "Lỗi khi xóa file",
      };
    }
    return {
      error: error instanceof Error ? error.message : "Lỗi không xác định",
    };
  }
}
