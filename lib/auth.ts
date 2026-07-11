"use server";
import axios from "axios";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    if (user.is_active === false || user.is_active === 0 || user.is_active === "false" || user.is_active === "0") {
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

    const token = resJWT.data?.token;
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
