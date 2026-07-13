"use client";
import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import {
  FileItem,
  uploadFileToDrive,
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
  role: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  isLoading: boolean;
  loadFiles: () => Promise<void>;
  uploadAndAddFile: (file: File) => Promise<void>;
  deleteAndRemoveFile: (fileId: string) => Promise<void>;
};

export const FileContext = createContext<FileContextType | null>(null);

export function FileProvider({
  children,
  role = "user",
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateFilesFromData = useCallback((data: FileItem[]) => {
    setFiles((prev) => {
      const completedFiles = prev.filter(
        (f) => f.isProcessing && data.some((d) => d.file_id === f.file_id),
      );

      completedFiles.forEach((file) => {
        toast.success(`File "${file.file_name}" đã xử lý xong`);
      });

      const processingFiles = prev.filter(
        (f) => f.isProcessing && !data.some((d) => d.file_id === f.file_id),
      );
      return [...processingFiles, ...data];
    });
  }, []);

  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllFile();
      updateFilesFromData(data);
    } catch (err) {
      console.error("Lỗi tải danh sách file:", err);
      toast.error(
        err instanceof Error ? err.message : "Lỗi tải danh sách file",
      );
    } finally {
      setIsLoading(false);
    }
  }, [updateFilesFromData]);

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
        formData.append("file", file);
        const result = await uploadFileToDrive(formData);

        // Upload xong lên Drive, n8n bắt đầu xử lý. Đổi trạng thái UI sang Đang xử lý.
        setFiles((prev) =>
          prev.map((f) =>
            f.file_id === tempId
              ? {
                  ...f,
                  file_id: result.fileId, // Cập nhật ID thật từ Drive
                  source_url: result.fileUrl,
                  isUploading: false,
                  isProcessing: true,
                }
              : f,
          ),
        );

        toast.success("Tải file thành công! Hệ thống đang xử lý dữ liệu...");

        // Render lại danh sách từ server (có thể chưa có file ngay lập tức vì n8n đang chạy ngầm)
        await loadFiles();
      } catch (err) {
        // Xóa tempId khỏi state nếu lỗi thật
        setFiles((prev) => prev.filter((f) => f.file_id !== tempId));

        console.warn("[uploadFile] Lỗi upload:", err);
        toast.error(err instanceof Error ? err.message : "Lỗi khi upload file");
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

  // Polling ngầm để cập nhật khi file đang xử lý xong
  useEffect(() => {
    const hasProcessingFiles = files.some((f) => f.isProcessing);
    if (!hasProcessingFiles) return;

    const intervalId = setInterval(async () => {
      try {
        const data = await getAllFile();
        setFiles((prev) => {
          const processingFiles = prev.filter(
            (f) => f.isProcessing && !data.some((d) => d.file_id === f.file_id),
          );
          return [...processingFiles, ...data];
        });
      } catch (err) {
        console.warn("Lỗi poll danh sách file ngầm:", err);
      }
    }, 5000); // Poll mỗi 5 giây

    return () => clearInterval(intervalId);
  }, [files.some((f) => f.isProcessing)]);

  return (
    <FileContext.Provider
      value={{
        role,
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
