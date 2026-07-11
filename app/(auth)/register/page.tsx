"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import style from "@/style/register.module.css";
import { RegisterUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handelHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const handelHiddenConfirmPassword = () => {
    setHiddenConfirmPassword(!hiddenConfirmPassword);
  };

  const handlSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    const numberRegex = /^\d+$/;

    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
      isValid = false;
    } else if (!nameRegex.test(name)) {
      newErrors.name = "Tên chỉ chứa chữ cái và khoảng trắng";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      isValid = false;
    } else if (!numberRegex.test(phone)) {
      newErrors.phone = "Số điện thoại chỉ được nhập số";
      isValid = false;
    }

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
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    if (!isValid) {
      return;
    }
    try {
      const user = await RegisterUser(formData);
      alert("Đăng kí tài khoản thành công !");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Lỗi không xác định");
      }
    }
  };

  // Xóa lỗi khi người dùng nhập lại
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

  return (
    <main className={style.container}>
      <div className={style.card}>
        <h1 className={style.title}>Đăng kí tài khoản</h1>
        <form className={style.form} onSubmit={handlSubmitForm} noValidate>
          {/* Họ và Tên */}
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="name">
              Họ và Tên
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${errors.name ? style.inputError : ""}`}
                type="text"
                id="name"
                value={name}
                placeholder="Nhập tên..."
                onChange={handleInputChange(setName, "name")}
              />
            </div>
            {errors.name && (
              <span className={style.errorMessage}>⚠ {errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="email">
              Email
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${errors.email ? style.inputError : ""}`}
                type="email"
                id="email"
                value={email}
                placeholder="Nhập email..."
                onChange={handleInputChange(setEmail, "email")}
              />
            </div>
            {errors.email && (
              <span className={style.errorMessage}>⚠ {errors.email}</span>
            )}
          </div>

          {/* Số điện thoại */}
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="phone">
              Số điện thoại
            </label>
            <div className={style.inputWrapper}>
              <input
                className={`${style.input} ${errors.phone ? style.inputError : ""}`}
                type="tel"
                id="phone"
                value={phone}
                placeholder="Nhập số điện thoại..."
                onChange={handleInputChange(setPhone, "phone")}
              />
            </div>
            {errors.phone && (
              <span className={style.errorMessage}>⚠ {errors.phone}</span>
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
                type={hiddenPassword ? "text" : "password"}
                id="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={handleInputChange(setPassword, "password")}
              />
              <div className={style.eyeIcon} onClick={handelHiddenPassword}>
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
                className={`${style.input} ${style.inputPassword} ${errors.confirmPassword ? style.inputError : ""}`}
                type={hiddenConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Xác nhận mật khẩu..."
                onChange={handleInputChange(
                  setConfirmPassword,
                  "confirmPassword",
                )}
              />
              <div
                className={style.eyeIcon}
                onClick={handelHiddenConfirmPassword}
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

          <button type="submit" className={style.submitBtn}>
            Đăng kí
          </button>
        </form>

        <div className={style.footer}>
          Đã có tài khoản?
          <Link href="/login" className={style.link}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
