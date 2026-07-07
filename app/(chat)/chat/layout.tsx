import ListChat from "./_components/ListChat";
import style from "../../../style/layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <nav className={style.sidebar}>
        <div className={style.sidebarTitle}>Lịch sử Chat</div>
        <ListChat />
      </nav>
      <main className={style.mainContent}>{children}</main>
    </div>
  );
}
