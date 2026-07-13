"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { updateProfile, getMyProfile } from "@/lib/user";
import toast from "react-hot-toast";
import style from "@/style/layout.module.css";

interface Props {
  onClose: () => void;
}

export default function UpdateProfileModal({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMyProfile();
        // N8n có thể trả về 'name' hoặc 'full_name' tùy thuộc database map.
        setFullName(data.full_name || data.name || "");
        setPhone(data.phone || "");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsFetching(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || fullName.trim().length < 2) {
      toast.error("Họ tên phải có ít nhất 2 ký tự");
      return;
    }

    if (phone && !/^[0-9]{9,11}$/.test(phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    try {
      setIsLoading(true);
      await updateProfile(fullName, phone);
      toast.success("Cập nhật thông tin thành công");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof document === "undefined" || !mounted) return null;

  const modalContent = (
    <div className={style.modalOverlay}>
      <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.modalTitle}>Thông tin cá nhân</h2>
        
        {isFetching ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#888" }}>Đang tải...</div>
        ) : (
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
                Họ và Tên
              </label>
              <input
                type="text"
                className={style.modalInput}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên..."
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
                Số điện thoại
              </label>
              <input
                type="tel"
                className={style.modalInput}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại..."
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
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
