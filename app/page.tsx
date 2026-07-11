import Link from "next/link";
import { BsChatDotsFill } from "react-icons/bs";
import style from "@/style/home.module.css";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <main className={style.container}>
      <div className={style.content}>
        <div className={style.iconWrapper}>
          <BsChatDotsFill className={style.icon} />
        </div>
        <h1 className={style.title}>Xin chào!</h1>
        <p className={style.description}>
          Sẵn sàng trò chuyện và khám phá những điều thú vị cùng trợ lý AI.
        </p>
        <Link className={style.button} href={"/chat"}>
          Bắt đầu Chat
        </Link>
      </div>
    </main>
  );
}
