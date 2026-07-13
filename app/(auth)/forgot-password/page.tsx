"use client";
import { useState } from "react";
import Link from "next/link";
import style from "@/style/auth.module.css";
import { forgotPassword } from "@/lib/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Email không đúng định dạng");
      return;
    }
    setEmailError("");

    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.message);
      // Route to verify-otp page, passing email as query param
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h1 className={style.title}>Quên mật khẩu</h1>
          <p className={style.subtitle}>
            Nhập email của bạn để nhận mã khôi phục
          </p>
        </div>

        <form className={style.form} onSubmit={handleSendOtp} noValidate>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="email">
              Email
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${
                  emailError ? style.inputError : ""
                }`}
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Nhập Email..."
              />
            </div>
            {emailError && (
              <span className={style.errorMessage}>⚠ {emailError}</span>
            )}
          </div>

          <button type="submit" className={style.button} disabled={isLoading}>
            {isLoading ? "Đang gửi..." : "Gửi mã OTP"}
          </button>
        </form>

        <div className={style.footer}>
          Quay lại trang
          <Link href="/login" className={style.link} style={{ marginLeft: 5 }}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
