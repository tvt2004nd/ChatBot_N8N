"use client";
import { useEffect, useState, useRef } from "react";
import { getCurrentUser, LogoutUser } from "@/lib/auth";
import style from "../../../../style/layout.module.css";
import { useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";

export default function UserProfile() {
  const [user, setUser] = useState<{ email: string; role: string; userId: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (data) {
        setUser({ email: data.email, role: data.role, userId: data.userId });
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await LogoutUser();
    router.push("/login");
  };

  const handleEditProfile = () => {
    alert("Chức năng chỉnh sửa thông tin cá nhân đang được phát triển!");
    setMenuOpen(false);
  };

  if (!user) return null;

  return (
    <div className={style.userProfileContainer} ref={menuRef}>
      <div className={style.userProfileCard} onClick={() => setMenuOpen(!menuOpen)}>
        <BsPersonCircle className={style.userProfileIcon} />
        <div className={style.userInfo}>
          <span className={style.userEmail}>{user.email}</span>
          <span className={style.userRole}>{user.role === "admin" ? "Quản trị viên" : "Người dùng"}</span>
        </div>
      </div>
      
      {menuOpen && (
        <div className={style.userProfileMenu}>
          <button className={style.userProfileMenuItem} onClick={handleEditProfile}>
            Chỉnh sửa thông tin cá nhân
          </button>
          <button className={`${style.userProfileMenuItem} ${style.logoutText}`} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
