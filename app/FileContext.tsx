"use client";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  FileItem,
  uploadFile as uploadFileApi,
  deleteFile as deleteFileApi,
} from "@/lib/file";
import getAllFile from "@/lib/file";
import toast from "react-hot-toast";

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
      toast.error(err instanceof Error ? err.message : "Lỗi tải danh sách file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadAndAddFile = useCallback(
    async (file: File) => {
      if (!allowType.includes(file.type)) {
        toast.error("File không đúng định dạng (hỗ trợ: PDF, Excel, Word)");
        return;
      }
      const isDuplicate = files.some(
        (f) => f.file_name.toLowerCase() === file.name.toLowerCase(),
      );
      if (isDuplicate) {
        toast.error(`File "${file.name}" đã được tải lên rồi`);
        return;
      }

      // Tạo một file ảo tạm thời để hiển thị trạng thái loading ngay lập tức
      const tempId = `temp_${Date.now()}`;
      const tempFile: FileItem = {
        file_id: tempId,
        file_name: file.name,
        modified_time: new Date(),
        source_url: "",
        isUploading: true,
      };
      
      // Đưa file ảo vào danh sách ngay lập tức
      setFiles((prev) => [tempFile, ...prev]);

      try {
        const formData = new FormData();
        formData.append("data", file);
        let result = await uploadFileApi(formData);

        if (result && typeof result === "object" && "error" in result) {
          throw new Error(result.error);
        }

        // N8N thường trả về mảng hoặc bọc trong object
        if (Array.isArray(result) && result.length > 0) result = result[0];
        if (result && result.data && Array.isArray(result.data)) result = result.data[0];
        else if (result && result.data) result = result.data;

        // Debug: log response shape để biết field name thực tế
        console.log("[uploadFile] result shape:", JSON.stringify(result).slice(0, 300));

        // Lấy file_id thật — thử các tên field phổ biến mà N8N có thể trả về
        const realFileId: string | undefined =
          result?.file_id ?? result?.id ?? result?.fileId;

        if (!realFileId || typeof realFileId !== "string" || realFileId.trim() === "") {
          // Không có file_id thật → rollback, không để tempId mồ côi trong state
          console.error(
            "[uploadFile] Không tìm thấy file_id hợp lệ trong response. Toàn bộ result:",
            result,
          );
          setFiles((prev) => prev.filter((f) => f.file_id !== tempId));
          toast.error("Upload thành công nhưng server không trả về file_id.");
          return;
        }

        // Cập nhật tempId → realFileId trong state
        setFiles((prev) =>
          prev.map((f) => {
            if (f.file_id === tempId) {
              return {
                file_id: realFileId,
                file_name: result.file_name ?? file.name,
                modified_time: result.modified_time
                  ? new Date(result.modified_time)
                  : new Date(),
                source_url: result.source_url ?? "",
                isUploading: false,
              };
            }
            return f;
          }),
        );

        console.log(`[uploadFile] Đã cập nhật tempId "${tempId}" → realId "${realFileId}"`);
        toast.success("Upload file thành công!");
      } catch (err) {
        // Xóa tempId khỏi state (không để lại file ảo mồ côi)
        setFiles((prev) => prev.filter((f) => f.file_id !== tempId));

        console.warn(
          "[uploadFile] Lỗi upload — re-sync danh sách để kiểm tra file có lên Drive không:",
          err,
        );
        toast.error(err instanceof Error ? err.message : "Lỗi khi upload file");
        loadFiles().catch((syncErr) =>
          console.error("[uploadFile] Re-sync sau lỗi thất bại:", syncErr),
        );
      }
    },
    [files, loadFiles],
  );

  const deleteAndRemoveFile = useCallback(async (fileId: string) => {
    try {
      const result = await deleteFileApi(fileId);
      if (result && typeof result === "object" && "error" in result) {
        toast.error(result.error);
        return;
      }
      setFiles((prev) => prev.filter((f) => f.file_id !== fileId));
      toast.success("Đã xóa file");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi khi xóa file");
    }
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
