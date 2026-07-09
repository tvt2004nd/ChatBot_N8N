"use client";
import { useFileContext } from "@/app/FileContext";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import style from "../../../../style/layout.module.css";
import {
  BsDatabase,
  BsChevronDown,
  BsCloudUpload,
  BsTrash,
  BsBoxArrowUpRight,
  BsFileEarmarkPdf,
  BsFileEarmarkExcel,
  BsFileEarmarkWord,
  BsFileEarmark,
} from "react-icons/bs";

export default function FilePanel() {
  const { files, isLoading, loadFiles, uploadAndAddFile, deleteAndRemoveFile } =
    useFileContext();
  const [showFiles, setShowFiles] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFileName, setUploadingFileName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFileName(file.name);
    setIsUploading(true);
    try {
      await uploadAndAddFile(file);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi upload file");
    } finally {
      setIsUploading(false);
      setUploadingFileName("");
      e.target.value = "";
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa "${fileName}"?`)) return;

    setDeletingId(fileId);
    try {
      await deleteAndRemoveFile(fileId);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi xóa file");
    } finally {
      setDeletingId(null);
    }
  };

  const getFileIconInfo = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    if (["pdf"].includes(ext))
      return { icon: <BsFileEarmarkPdf />, colorClass: style.iconRed };
    if (["xlsx", "xls", "csv"].includes(ext))
      return { icon: <BsFileEarmarkExcel />, colorClass: style.iconGreen };
    if (["docx", "doc", "txt"].includes(ext))
      return { icon: <BsFileEarmarkWord />, colorClass: style.iconBlue };
    return { icon: <BsFileEarmark />, colorClass: style.iconGray };
  };

  return (
    <>
      {/* Upload overlay toàn màn hình — mount ra ngoài DOM qua portal */}
      {isUploading &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={style.uploadOverlay}>
            <div className={style.uploadOverlayCard}>
              <span className={style.uploadOverlaySpinner} />
              <div className={style.uploadOverlayText}>
                <span className={style.uploadOverlayTitle}>
                  Đang xử lý tài liệu...
                </span>
                {uploadingFileName && (
                  <span
                    className={style.uploadOverlayFileName}
                    title={uploadingFileName}
                  >
                    {uploadingFileName}
                  </span>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className={style.fileSection}>
        <div
          className={style.fileSectionHeader}
          onClick={() => setShowFiles(!showFiles)}
        >
          <div className={style.fileSectionTitle}>
            <BsDatabase style={{ fontSize: "1.1rem" }} />
            Tài liệu
            {files.length > 0 && (
              <span className={style.fileCount}>{files.length}</span>
            )}
          </div>
          <span
            className={`${style.fileSectionToggle} ${showFiles ? style.fileSectionToggleOpen : ""}`}
          >
            <BsChevronDown />
          </span>
        </div>

        {showFiles && (
          <div className={style.fileSectionBody}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className={style.fileInputHidden}
            />
            <button
              className={style.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className={style.uploadSpinner}></span>
                  <span>Đang tải...</span>
                </>
              ) : (
                <>
                  <span className={style.uploadIcon}>
                    <BsCloudUpload />
                  </span>
                  <span>Tải file lên</span>
                </>
              )}
            </button>

            {isLoading ? (
              <div className={style.filePanelMsg}>Đang tải danh sách...</div>
            ) : files.length === 0 ? (
              <div className={style.filePanelMsg}>Chưa có tài liệu nào</div>
            ) : (
              <ul className={style.fileList}>
                {files.map((file) => {
                  const { icon, colorClass } = getFileIconInfo(file.file_name);
                  return (
                    <li key={file.file_id} className={style.fileItem}>
                      <div className={`${style.fileIconWrapper} ${colorClass}`}>
                        {icon}
                      </div>
                      <div className={style.fileDetails}>
                        <span className={style.fileName} title={file.file_name}>
                          {file.file_name}
                        </span>
                        <span className={style.fileTime}>
                          {new Date(file.modified_time).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className={style.fileActions}>
                        {file.isUploading ? (
                          <span
                            className={style.uploadSpinner}
                            style={{
                              width: 14,
                              height: 14,
                              borderWidth: "1.5px",
                              marginRight: 8,
                            }}
                          ></span>
                        ) : (
                          <>
                            <a
                              href={file.source_url}
                              target="_blank"
                              className={style.actionBtn}
                              title="Xem file"
                            >
                              <BsBoxArrowUpRight />
                            </a>
                            <button
                              className={`${style.actionBtn} ${style.actionBtnDelete}`}
                              title="Xóa file"
                              disabled={deletingId === file.file_id}
                              onClick={() =>
                                handleDelete(file.file_id, file.file_name)
                              }
                            >
                              {deletingId === file.file_id ? (
                                <span
                                  className={style.uploadSpinner}
                                  style={{
                                    width: 14,
                                    height: 14,
                                    borderWidth: "1.5px",
                                  }}
                                ></span>
                              ) : (
                                <BsTrash />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
