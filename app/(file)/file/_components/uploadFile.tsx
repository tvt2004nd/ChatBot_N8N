"use client";
import { useFileContext } from "@/app/FileContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadFile() {
  const { uploadAndAddFile } = useFileContext();
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    try {
      await uploadAndAddFile(file);
      console.log("Upload thành công:", file.name);
    } catch (err) {
      console.error("Upload lỗi:", err);
      toast.error(err instanceof Error ? err.message : "Lỗi upload file");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <h2>Upload file</h2>
      <input type="file" onChange={handleChange} disabled={isUploading} />
      {isUploading && <div>Đang tải lên: {fileName}...</div>}
    </div>
  );
}
