"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { changePassword } from "@/lib/auth";
import toast from "react-hot-toast";
import style from "@/style/layout.module.css";

interface Props {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error("Mật khẩu ≥ 8 kí tự, có chữ hoa, thường và số");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      setIsLoading(true);
      await changePassword(currentPassword, newPassword, confirmPassword);
      toast.success("Đổi mật khẩu thành công");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đổi mật khẩu thất bại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof document === "undefined") return null;

  const modalContent = (
    <div className={style.modalOverlay}>
      <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.modalTitle}>Đổi mật khẩu</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "0.9rem",
                marginBottom: "6px",
                display: "block",
                color: "inherit",
                opacity: 0.9,
              }}
            >
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              className={style.modalInput}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại..."
              required
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "0.9rem",
                marginBottom: "6px",
                display: "block",
                color: "inherit",
                opacity: 0.9,
              }}
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              className={style.modalInput}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới..."
              required
              minLength={6}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "0.9rem",
                marginBottom: "6px",
                display: "block",
                color: "inherit",
                opacity: 0.9,
              }}
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className={style.modalInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới..."
              required
              minLength={6}
            />
          </div>
          <div className={style.modalActions}>
            <button
              type="button"
              className={style.modalCancel}
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={style.modalSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
