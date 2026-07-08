"use client";

import { useState } from "react";
import ListChat from "./_components/ListChat";
import FilePanel from "./_components/FilePanel";
import style from "../../../style/layout.module.css";
import { BsList, BsFolder } from "react-icons/bs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const closeSidebars = () => {
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  return (
    <div className={style.container}>
      <div 
        className={`${style.overlay} ${(isLeftOpen || isRightOpen) ? style.overlayActive : ""}`} 
        onClick={closeSidebars}
      ></div>

      <nav className={`${style.sidebar} ${isLeftOpen ? style.sidebarOpen : ""}`}>
        <div className={style.sidebarTitle}>Lịch sử Chat</div>
        <ListChat />
      </nav>
      
      <main className={style.mainContent}>
        <header className={style.chatHeader}>
          <button className={style.mobileMenuBtn} onClick={() => setIsLeftOpen(true)}>
            <BsList />
          </button>
          
          <h2 className={style.chatHeaderTitle}>Cuộc trò chuyện</h2>
          
          <button className={style.mobileMenuBtn} onClick={() => setIsRightOpen(true)}>
            <BsFolder />
          </button>
        </header>
        <div className={style.chatArea}>
          {children}
        </div>
      </main>
      
      <aside className={`${style.rightSidebar} ${isRightOpen ? style.rightSidebarOpen : ""}`}>
        <FilePanel />
      </aside>
    </div>
  );
}
