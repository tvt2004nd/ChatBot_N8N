"use client";
import { useFileContext } from "@/app/FileContext";
import { useEffect, useState } from "react";

export default function ListFile() {
  const { files, isLoading, loadFiles, deleteAndRemoveFile } = useFileContext();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa "${fileName}"?`)) return;

    setDeletingId(fileId);
    try {
      await deleteAndRemoveFile(fileId);
    } catch (err) {
      alert(err || "Lỗi xóa file");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <div>Đang tải danh sách file...</div>;
  }

  if (files.length === 0) {
    return <div>Chưa có file nào được tải lên</div>;
  }

  return (
    <div>
      {files.map((file) => (
        <div key={file.file_id}>
          <div>{file.file_name}</div>
          <div>{file.modified_time.toString()}</div>
          <a href={file.source_url} target="_blank">
            Xem file
          </a>
          <button
            onClick={() => handleDelete(file.file_id, file.file_name)}
            disabled={deletingId === file.file_id}
            style={{
              marginLeft: 8,
              color: "#ef4444",
              background: "transparent",
              border: "1px solid #ef4444",
              borderRadius: 4,
              padding: "4px 10px",
              cursor: deletingId === file.file_id ? "not-allowed" : "pointer",
              opacity: deletingId === file.file_id ? 0.5 : 1,
            }}
          >
            {deletingId === file.file_id ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      ))}
    </div>
  );
}
