"use client";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import {
  FileItem,
  uploadFile as uploadFileApi,
  deleteFile as deleteFileApi,
} from "@/lib/file";
import getAllFile from "@/lib/file";

export const allowType = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

type FileContextType = {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  isLoading: boolean;
  loadFiles: () => Promise<void>;
  uploadAndAddFile: (file: File) => Promise<void>;
  deleteAndRemoveFile: (fileId: string) => Promise<void>;
};

export const FileContext = createContext<FileContextType | null>(null);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllFile();
      setFiles(data);
    } catch (err) {
      console.error("Lỗi tải danh sách file:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadAndAddFile = useCallback(async (file: File) => {
    if (!allowType.includes(file.type)) {
      throw new Error("File không đúng định dạng");
    }
    // Check trùng file đã tải lên
    const isDuplicate = files.some(
      (f) => f.file_name.toLowerCase() === file.name.toLowerCase()
    );
    if (isDuplicate) {
      throw new Error(`File "${file.name}" đã được tải lên rồi`);
    }
    const formData = new FormData();
    formData.append("data", file);
    const result = await uploadFileApi(formData);

    const newFile: FileItem = {
      file_id: result.file_id ?? Date.now().toString(),
      file_name: result.file_name ?? file.name,
      modified_time: result.modified_time ?? new Date(),
      source_url: result.source_url ?? "",
    };
    setFiles((prev) => [...prev, newFile]);
  }, [files]);

  const deleteAndRemoveFile = useCallback(async (fileId: string) => {
    await deleteFileApi(fileId);
    setFiles((prev) => prev.filter((f) => f.file_id !== fileId));
  }, []);

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
        isLoading,
        loadFiles,
        uploadAndAddFile,
        deleteAndRemoveFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("lỗi không dùng file context");
  }
  return context;
}
