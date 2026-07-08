"use client";
import getAllSession, { deleteSession, updateTitle } from "@/lib/session";

import Link from "next/link";
import { sessionItem } from "@/lib/session";
import style from "../../../../style/layout.module.css";
import { BsClockHistory } from "react-icons/bs";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

export default function ListChat() {
  const [listSession, setListSession] = useState<sessionItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [renameSession, setRenameSession] = useState<sessionItem | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getAllSession();
      setListSession(data);
    };
    fetchSession();
  }, [pathname]);
  // xử lí  mở cái menu

  const toggleMenu = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleOpenRename = (e: React.MouseEvent, session: sessionItem) => {
    e.preventDefault();
    setRenameSession(session);
    setOpenMenuId(null);
    setTitle(session.title);
  };

  // xử lí update  title
  const handelUpdateTitle = async () => {
    if (!renameSession) {
      return;
    }
    await updateTitle(renameSession.id, title);
    setListSession((prev) =>
      prev.map((item) =>
        item.id === renameSession.id ? { ...item, title } : item,
      ),
    );
    setRenameSession(null);
  };
  // xử lí xóa session
  const handelDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
    setListSession((prev) => prev.filter((s) => s.id !== sessionId));
  };
  return (
    <>
      <div className={style.newChatContainer}>
        <Link href="/chat" className={style.newChatBtn}>
          <span className={style.newChatIcon}>+</span>
          Đoạn chat mới
        </Link>
      </div>
      <div className={style.historyScrollArea}>
        <ul className={style.list}>
          {listSession.map((session) => (
            <li key={session.id} className={style.listItem}>
              <Link href={`/chat/${session.id}`} className={style.link}>
                <span className={style.icon}>
                  <BsClockHistory />
                </span>
                <span className={style.linkText}>{session.title}</span>
              </Link>
              <button
                className={style.buttonDetail}
                onClick={(e) => toggleMenu(e, session.id)}
              >
                &#8285;
              </button>
              <div
                className={`${style.actionMenu} ${openMenuId !== session.id ? style.hidden : ""}`}
              >
                <button
                  className={style.actionButton}
                  onClick={(e) => handleOpenRename(e, session)}
                >
                  Đổi tên
                </button>
                <button
                  onClick={() => handelDeleteSession(session.id)}
                  className={`${style.actionButton} ${style.deleteButton}`}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {renameSession && (
        <div className={style.modalOverlay}>
          <div className={style.modalBox}>
            <h3 className={style.modalTitle}>Đổi tên đoạn chat</h3>
            <input
              className={style.modalInput}
              value={title}
              autoFocus
              placeholder="Nhập tên mới..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={style.modalActions}>
              <button
                className={style.modalCancel}
                onClick={() => setRenameSession(null)}
              >
                Đóng
              </button>
              <button onClick={handelUpdateTitle} className={style.modalSubmit}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
