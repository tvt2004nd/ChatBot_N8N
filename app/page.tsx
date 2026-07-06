import Link from "next/link";
import { BsChatDotsFill } from "react-icons/bs";
import style from "@/style/home.module.css";
export default function Home() {
  return (
    <main className={style.container}>
      <Link className={style.button} href={"/chat"}>
        <BsChatDotsFill size={24} />
      </Link>
    </main>
  );
}
