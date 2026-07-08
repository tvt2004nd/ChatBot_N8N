"use server";
import axios from "axios";

export type FileItem = {
  file_id: string;
  file_name: string;
  modified_time: Date;
  source_url: string;
};

export default async function getAllFile(): Promise<FileItem[]> {
  const url = process.env.N8N_FILE;
  if (!url) {
    throw new Error("không tìm thấy url");
  }
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
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
    throw error;
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
    throw error;
  }
}

