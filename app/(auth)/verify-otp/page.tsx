"use client";
import { useState, Suspense } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import style from "@/style/auth.module.css";
import { resetPasswordWithOtp } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Không tìm thấy email, vui lòng thao tác lại từ đầu");
      router.push("/forgot-password");
      return;
    }

    let isValid = true;
    const newErrors = { otp: "", password: "", confirmPassword: "" };

    if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "Mã OTP phải gồm 6 chữ số";
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Mật khẩu ≥ 8 kí tự, có chữ hoa, thường và số";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setIsLoading(true);
    try {
      const res = await resetPasswordWithOtp(
        email,
        otp,
        password,
        confirmPassword,
      );
      toast.success(res.message);
      router.push("/login");
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
    <div className={style.card}>
      <div className={style.header}>
        <h1 className={style.title}>Nhập mã xác nhận</h1>
        <p className={style.subtitle}>
          Mã OTP đã được gửi đến: <strong style={{ color: "var(--primary-color, #10b981)" }}>{email}</strong>
        </p>
      </div>

      <form className={style.form} onSubmit={handleResetPassword} noValidate>
        {/* OTP */}
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="otp">
            Mã OTP
          </label>
          <div className={style.inputWrapper}>
            <input
              className={`${style.input} ${errors.otp ? style.inputError : ""}`}
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setErrors((prev) => ({ ...prev, otp: "" }));
              }}
              placeholder="Nhập mã OTP 6 số..."
            />
          </div>
          {errors.otp && (
            <span className={style.errorMessage}>⚠ {errors.otp}</span>
          )}
        </div>

        {/* Mật khẩu */}
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="password">
            Mật khẩu mới
          </label>
          <div className={style.inputWrapper}>
            <input
              className={`${style.input} ${style.inputPassword} ${
                errors.password ? style.inputError : ""
              }`}
              id="password"
              type={hiddenPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="Nhập mật khẩu mới..."
            />
            <div
              className={style.eyeIcon}
              onClick={() => setHiddenPassword(!hiddenPassword)}
            >
              {hiddenPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && (
            <span className={style.errorMessage}>⚠ {errors.password}</span>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="confirmPassword">
            Xác nhận mật khẩu
          </label>
          <div className={style.inputWrapper}>
            <input
              className={`${style.input} ${style.inputPassword} ${
                errors.confirmPassword ? style.inputError : ""
              }`}
              id="confirmPassword"
              type={hiddenConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              placeholder="Xác nhận mật khẩu mới..."
            />
            <div
              className={style.eyeIcon}
              onClick={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}
            >
              {hiddenConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.confirmPassword && (
            <span className={style.errorMessage}>
              ⚠ {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className={style.button} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>
        <div
          className={style.footer}
          style={{
            marginTop: "1rem",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <Link href="/forgot-password" className={style.link}>
            Quay lại nhập email
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function VerifyOtp() {
  return (
    <main className={style.container}>
      <Suspense fallback={<div className={style.card}>Đang tải...</div>}>
        <VerifyOtpContent />
      </Suspense>
    </main>
  );
}
