import ListChat from "./_components/ListChat";
import FilePanel from "./_components/FilePanel";
import style from "../../../style/layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <nav className={style.sidebar}>
        <div className={style.sidebarTitle}>Lịch sử Chat</div>
        <ListChat />
      </nav>
      <main className={style.mainContent}>
        <header className={style.chatHeader}>
          <h2 className={style.chatHeaderTitle}>Cuộc trò chuyện</h2>
        </header>
        <div className={style.chatArea}>
          {children}
        </div>
      </main>
      <aside className={style.rightSidebar}>
        <FilePanel />
      </aside>
    </div>
  );
}
