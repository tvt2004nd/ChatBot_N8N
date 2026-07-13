"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getPaginatedUsers, toggleUserStatus } from "@/lib/user";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiUnlock,
  FiLock,
} from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";
import style from "@/style/userManagement.module.css";

interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
  total: string;
}

interface Props {
  onClose: () => void;
}

export default function UserManagementModal({ onClose }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // lần load đầu tiên (chưa có data)
  const [isFetching, setIsFetching] = useState<boolean>(false); // fetch ngầm (đã có data cũ hiển thị)
  const [total, setTotal] = useState<number>(0);
  const [actingUserId, setActingUserId] = useState<number | null>(null);

  const handleToggleStatus = async (user: User) => {
    try {
      setActingUserId(user.id);
      const newStatus = !user.is_active;
      await toggleUserStatus(user.id, newStatus);
      
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: newStatus } : u));
      toast.success(`Đã ${newStatus ? 'mở khóa' : 'khóa'} tài khoản thành công`);
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật trạng thái tài khoản");
    } finally {
      setActingUserId(null);
    }
  };

  // Pagination
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  // Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Theo dõi searchTerm trước đó để biết khi nào cần reset page về 1
  const prevSearchRef = useRef(debouncedSearchTerm);
  // Huỷ request cũ khi có request mới (tránh nháy do request trả về sai thứ tự)
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const searchChanged = prevSearchRef.current !== debouncedSearchTerm;
    prevSearchRef.current = debouncedSearchTerm;

    // Nếu search đổi và đang không ở trang 1 -> chỉ setPage(1),
    // effect sẽ tự chạy lại do page đổi, KHÔNG fetch ở lần này để tránh gọi API 2 lần liên tiếp
    if (searchChanged && page !== 1) {
      setPage(1);
      return;
    }

    // Huỷ request trước đó nếu còn đang chạy
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchUsers = async () => {
      const isFirstLoad = users.length === 0;
      if (isFirstLoad) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }

      try {
        const offset = (page - 1) * limit;
        const data = await getPaginatedUsers({
          limit,
          offset,
          search: debouncedSearchTerm || undefined,
        });

        // Nếu request đã bị huỷ (có request mới hơn) thì bỏ qua kết quả này
        if (controller.signal.aborted) return;

        if (Array.isArray(data)) {
          setUsers(data);
          setTotal(
            data.length > 0 ? parseInt(data[0].total) || data.length : 0,
          );
        } else {
          setUsers([]);
          setTotal(0);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch users:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsFetching(false);
        }
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearchTerm]);

  const totalPages = Math.ceil(total / limit) || 1;

  if (typeof document === 'undefined') return null;

  const modalContent = (
    <div className={style.overlay}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <h2 className={style.title}>Quản lý người dùng</h2>
          <button className={style.closeButton} onClick={onClose} title="Đóng">
            &times;
          </button>
        </div>

        <div className={style.body}>
          <div className={style.toolbar}>
            <div style={{ position: "relative", flex: 1 }}>
              <FiSearch
                size={16}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}
              />
              <input
                type="text"
                placeholder="Tìm kiếm bằng tên hoặc SĐT..."
                className={style.searchInput}
                style={{ paddingLeft: 32 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div
            className={style.tableContainer}
            style={{
              opacity: isFetching ? 0.5 : 1,
              transition: "opacity 0.15s ease",
              pointerEvents: isFetching ? "none" : "auto",
            }}
          >
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Mã ID</th>
                  <th>Thông tin</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Ngày tham gia</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className={style.loading}>
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={style.empty}>
                      Không tìm thấy người dùng nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <strong style={{ fontWeight: 600 }}>
                            {user.full_name}
                          </strong>
                          <span style={{ fontSize: "0.85rem", color: "#888" }}>
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td>{user.phone || "Không có"}</td>
                      <td>
                        <span
                          className={
                            user.role === "admin"
                              ? style.roleAdmin
                              : style.roleUser
                          }
                        >
                          {user.role === "admin"
                            ? "Quản trị viên"
                            : "Người dùng"}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.9rem" }}>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={
                            user.is_active
                              ? style.statusActive
                              : style.statusLocked
                          }
                        >
                          {user.is_active ? "Hoạt động" : "Bị khóa"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className={style.actionBtn}
                          title={
                            user.is_active
                              ? "Khóa tài khoản"
                              : "Mở khóa tài khoản"
                          }
                          onClick={() => handleToggleStatus(user)}
                          disabled={actingUserId === user.id}
                          style={{ opacity: actingUserId === user.id ? 0.5 : 1, cursor: actingUserId === user.id ? "not-allowed" : "pointer" }}
                        >
                          {user.is_active ? (
                            <FiLock size={18} />
                          ) : (
                            <FiUnlock size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && total > 0 && (
            <div className={style.pagination}>
              <span>
                Hiển thị {(page - 1) * limit + 1} đến{" "}
                {Math.min(page * limit, total)} trong tổng số {total}
              </span>
              <div className={style.pageControls}>
                <button
                  className={style.pageBtn}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <FiChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;
                  let isVisible = false;

                  if (totalPages <= 5) {
                    isVisible = true;
                  } else if (page <= 3 && pageNum <= 5) {
                    isVisible = true;
                  } else if (
                    page >= totalPages - 2 &&
                    pageNum >= totalPages - 4
                  ) {
                    isVisible = true;
                  } else if (pageNum >= page - 2 && pageNum <= page + 2) {
                    isVisible = true;
                  }

                  if (isVisible) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={style.pageBtn}
                        style={
                          page === pageNum
                            ? {
                                background: "#2563eb",
                                color: "#fff",
                                borderColor: "#2563eb",
                              }
                            : {}
                        }
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  className={style.pageBtn}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
