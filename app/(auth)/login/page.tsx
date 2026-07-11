"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import style from "@/style/auth.module.css";
import { LoginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: keyof typeof errors,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    setIsSubmitting(true); // xem điểm 3 bên dưới
    try {
      await LoginUser(formData);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Có lỗi xảy ra");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h1 className={style.title}>Đăng nhập</h1>
          <p className={style.subtitle}>Chào mừng bạn quay trở lại 👋</p>
        </div>

        <form className={style.form} onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="email">
              Email
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${errors.email ? style.inputError : ""}`}
                id="email"
                type="email"
                value={email}
                onChange={handleInputChange(setEmail, "email")}
                placeholder="Nhập Email..."
              />
            </div>
            {errors.email && (
              <span className={style.errorMessage}>⚠ {errors.email}</span>
            )}
          </div>

          {/* Mật khẩu */}
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="password">
              Mật khẩu
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${style.inputPassword} ${errors.password ? style.inputError : ""}`}
                id="password"
                type={hiddenPassword ? "text" : "password"}
                value={password}
                onChange={handleInputChange(setPassword, "password")}
                placeholder="Nhập mật khẩu..."
              />
              <div className={style.eyeIcon} onClick={handelHiddenPassword}>
                {hiddenPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <span className={style.errorMessage}>⚠ {errors.password}</span>
            )}
          </div>

          <button type="submit" className={style.button}>
            Đăng nhập
          </button>
        </form>

        <div className={style.footer}>
          Chưa có tài khoản?
          <Link href="/register" className={style.link}>
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </main>
  );
}
