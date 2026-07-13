"use client";
import { useEffect, useState, useRef } from "react";
import { getCurrentUser, LogoutUser } from "@/lib/auth";
import style from "../../../../style/layout.module.css";
import { useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";
import UserManagementModal from "@/app/(user)/user/_components/UserManagementModal";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";

export default function UserProfile() {
  const [user, setUser] = useState<{ email: string; role: string; userId: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

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

  if (!user) return null;

  return (
    <>
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
          {user.role === "admin" && (
            <button className={style.userProfileMenuItem} onClick={() => { setShowManageUsers(true); setMenuOpen(false); }}>
              Quản lý người dùng
            </button>
          )}
          <button className={style.userProfileMenuItem} onClick={() => { setShowUpdateProfile(true); setMenuOpen(false); }}>
            Chỉnh sửa thông tin cá nhân
          </button>
          <button className={style.userProfileMenuItem} onClick={() => { setShowChangePassword(true); setMenuOpen(false); }}>
            Đổi mật khẩu
          </button>
          <button className={`${style.userProfileMenuItem} ${style.logoutText}`} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
    {showManageUsers && <UserManagementModal onClose={() => setShowManageUsers(false)} />}
    {showUpdateProfile && <UpdateProfileModal onClose={() => setShowUpdateProfile(false)} />}
    {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
    </>
  );
}
