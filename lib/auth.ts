"use server";
import axios from "axios";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export async function RegisterUser(formData: FormData): Promise<User> {
  const url = process.env.N8N_REGISTER;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const hashPassword = await bcrypt.hash(password, 10);
  if (!url) {
    throw new Error("không tìm thấy url");
  }
  try {
    const res = await axios.post(url, {
      email,
      name,
      phone,
      hashPassword,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Có lỗi xảy ra");
    }

    throw err;
  }
}

export async function LoginUser(formData: FormData) {
  const urlJWT = process.env.N8N_LOGIN;
  const url = process.env.N8N_GET_USER_BY_EMAIL;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!urlJWT || !url) {
    throw new Error("không tìm thấy url");
  }

  try {
    const res = await axios.post(url, { email });
    const user = res.data;
    console.log(user);
    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Bỏ qua kiểm tra is_active ở bước này nếu N8N_GET_USER_BY_EMAIL không trả về.
    // Nếu có trả về thì kiểm tra luôn.

    // Xử lý các định dạng boolean/string/number trả về từ database
    const isLocked =
      user.is_active === false ||
      user.is_active === 0 ||
      user.is_active === "false" ||
      user.is_active === "0" ||
      user.is_active === "f" ||
      String(user.is_active).toLowerCase() === "false" ||
      String(user.is_active).toLowerCase() === "f";

    if (isLocked) {
      throw new Error("Tài khoản của bạn đã bị vô hiệu hóa");
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    const resJWT = await axios.post(urlJWT, {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const jwtData = resJWT.data;

    // Kiểm tra is_active từ response của N8N_LOGIN (nếu có)
    const isLockedJwt =
      jwtData?.is_active === false ||
      jwtData?.is_active === 0 ||
      jwtData?.is_active === "false" ||
      jwtData?.is_active === "0" ||
      jwtData?.is_active === "f" ||
      String(jwtData?.is_active).toLowerCase() === "false" ||
      String(jwtData?.is_active).toLowerCase() === "f";

    if (isLockedJwt) {
      throw new Error("Tài khoản của bạn đã bị vô hiệu hóa");
    }

    const token = jwtData?.token;
    if (!token) {
      throw new Error("Không nhận được token");
    }

    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Có lỗi xảy ra");
    }
    throw err;
  }
}
export async function getCurrentUser(): Promise<JwtPayload | null> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Thiếu JWT_SECRET trong .env");

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token đã hết hạn");
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.log("Token không hợp lệ");
    }
    return null;
  }
}

export async function LogoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
  }

  if (newPassword.length < 6) {
    throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp");
  }

  if (newPassword === currentPassword) {
    throw new Error("Mật khẩu mới phải khác mật khẩu hiện tại");
  }

  const getUserUrl = process.env.N8N_GET_USER_BY_EMAIL;
  const updatePasswordUrl = process.env.N8N_UPDATE_PASSWORD;

  if (!getUserUrl || !updatePasswordUrl) {
    throw new Error("Thiếu cấu hình URL trong environment variables");
  }

  try {
    // 1. Lấy password_hash hiện tại để verify
    const res = await axios.post(getUserUrl, { email: currentUser.email });
    const rawData = res.data;
    const user = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!user || !user.id) {
      throw new Error("Không tìm thấy thông tin tài khoản");
    }

    // 2. Verify mật khẩu hiện tại đúng không
    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      throw new Error("Mật khẩu hiện tại không đúng");
    }

    // 3. Hash mật khẩu mới
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // 4. Gọi n8n update
    const updateRes = await axios.post(updatePasswordUrl, {
      userId: user.id,
      newPasswordHash,
    });

    const updateData = Array.isArray(updateRes.data)
      ? updateRes.data[0]
      : updateRes.data;

    if (!updateData?.id) {
      throw new Error("Không thể cập nhật mật khẩu");
    }

    return { success: true, message: "Đổi mật khẩu thành công" };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Có lỗi xảy ra");
    }
    throw err;
  }
}

export async function forgotPassword(email: string) {
  const url = process.env.N8N_FORGOT_PASSWORD;
  if (!url) throw new Error("Thiếu N8N_FORGOT_PASSWORD trong .env");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  try {
    const res = await axios.post(url, { email, otp, otpHash, expiresAt });
    const data = Array.isArray(res.data) ? res.data[0] : res.data;
    return { success: true, message: data?.message || "Đã gửi mã OTP" };
  } catch (err) {
    console.error("Lỗi forgotPassword:", err);
    return { success: true, message: "Nếu email tồn tại, mã OTP đã được gửi" };
  }
}

export async function resetPasswordWithOtp(
  email: string,
  otp: string,
  newPassword: string,
  confirmPassword: string,
) {
  if (!/^\d{6}$/.test(otp)) {
    throw new Error("Mã OTP phải gồm 6 chữ số");
  }
  if (newPassword.length < 8) {
    throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp");
  }

  const url = process.env.N8N_VERIFY_OTP_RESET;
  if (!url) throw new Error("Thiếu N8N_VERIFY_OTP_RESET trong .env");

  const inputOtpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  try {
    const res = await axios.post(url, { email, inputOtpHash, newPasswordHash });
    const data = Array.isArray(res.data) ? res.data[0] : res.data;

    if (!data?.success) {
      throw new Error(data?.message || "Không thể đặt lại mật khẩu");
    }

    return { success: true, message: "Đặt lại mật khẩu thành công" };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(
        err.response?.data?.message || "Mã OTP không đúng hoặc đã hết hạn",
      );
    }
    throw err;
  }
}
