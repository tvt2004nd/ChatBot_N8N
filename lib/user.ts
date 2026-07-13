"use server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type UserItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean | number; // có thể là 0/1 hoặc true/false
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractUserArray(raw: any): any[] {
  if (!raw) return [];

  if (
    Array.isArray(raw) &&
    raw.length > 0 &&
    (raw[0].id !== undefined ||
      raw[0].total !== undefined ||
      raw[0].email !== undefined)
  ) {
    return raw;
  }

  if (Array.isArray(raw) && raw.length === 1 && Array.isArray(raw[0])) {
    return extractUserArray(raw[0]);
  }

  if (Array.isArray(raw) && raw.length === 1 && raw[0].json) {
    return extractUserArray(raw[0].json);
  }
  if (!Array.isArray(raw) && raw.json) {
    return extractUserArray(raw.json);
  }

  if (Array.isArray(raw) && raw.length === 1 && raw[0].data) {
    return extractUserArray(raw[0].data);
  }
  if (!Array.isArray(raw) && raw.data) {
    return extractUserArray(raw.data);
  }

  if (
    Array.isArray(raw) &&
    raw.length > 0 &&
    raw[0].json &&
    !Array.isArray(raw[0].json)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return raw.map((item: any) => item.json);
  }

  if (
    !Array.isArray(raw) &&
    (raw.id !== undefined || raw.email !== undefined || raw.total !== undefined)
  ) {
    return [raw];
  }

  return Array.isArray(raw) ? raw : [];
}

export async function getAllUsers(search: string = ""): Promise<UserItem[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Không có quyền truy cập");
  }

  const url = process.env.N8N_GET_USER;

  if (!url) {
    throw new Error("N8N_GET_USER is not defined in environment variables.");
  }

  try {
    const res = await axios.get(url, {
      params: { search, userId: currentUser.userId },
    });
    const data = extractUserArray(res.data);

    if (Array.isArray(data)) {
      return data.map((u) => ({
        ...u,
        name: u.name || u.full_name || "Unknown",
      }));
    }

    return [];
  } catch (err) {
    console.error("Lỗi lấy danh sách user:", err);
    return [];
  }
}

export async function toggleUserStatus(
  targetUserId: number,
  newStatus: boolean,
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Không có quyền truy cập");
  }

  const url = process.env.N8N_BLOCK_ACCOUNT;

  if (!url) {
    throw new Error(
      "N8N_BLOCK_ACCOUNT is not defined in environment variables.",
    );
  }

  // GỌI API BACKEND N8N
  try {
    const res = await axios.post(url, {
      adminId: currentUser.userId,
      targetUserId,
      is_active: newStatus,
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái user:", err);
    throw new Error("Không thể cập nhật trạng thái");
  }
}

export async function getPaginatedUsers(params: {
  limit: number;
  offset: number;
  search?: string;
  role?: string;
}) {
  try {
    const baseUrl = process.env.N8N_GET_USER;
    if (!baseUrl) {
      throw new Error("N8N_GET_USER is not defined in environment variables.");
    }

    const url = new URL(baseUrl);
    url.searchParams.append("limit", params.limit.toString());
    url.searchParams.append("offset", params.offset.toString());

    if (params.search) {
      url.searchParams.append("search", params.search);
    }
    if (params.role) {
      url.searchParams.append("role", params.role);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = extractUserArray(await response.json());

    return data;
  } catch (error) {
    console.error("Error in getPaginatedUsers server action:", error);
    throw error;
  }
}
export async function updateProfile(fullName: string, phone: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
  }

  if (!fullName || fullName.trim().length < 2) {
    throw new Error("Họ tên phải có ít nhất 2 ký tự");
  }
  if (phone && !/^[0-9]{9,11}$/.test(phone)) {
    throw new Error("Số điện thoại không hợp lệ");
  }

  const url = process.env.N8N_UPDATE_PROFILE;
  if (!url) {
    throw new Error(
      "N8N_UPDATE_PROFILE is not defined in environment variables.",
    );
  }

  try {
    const res = await axios.post(url, {
      userId: currentUser.userId,
      fullName: fullName.trim(),
      phone: phone?.trim() || null,
    });

    const data = Array.isArray(res.data) ? res.data[0] : res.data;

    if (!data?.id) {
      throw new Error("Không thể cập nhật thông tin");
    }

    revalidatePath("/profile");

    return {
      success: true,
      user: {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        phone: data.phone,
        role: data.role,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Có lỗi xảy ra");
    }
    throw err;
  }
}
export async function getMyProfile() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
  }

  const url = process.env.N8N_GET_USER_BY_EMAIL;
  if (!url) {
    throw new Error(
      "N8N_GET_USER_BY_EMAIL is not defined in environment variables.",
    );
  }

  const res = await axios.post(url, { email: currentUser.email });
  const rawData = res.data;
  const user = Array.isArray(rawData) ? rawData[0] : rawData;

  if (!user?.id) {
    throw new Error("Không tìm thấy thông tin tài khoản");
  }

  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    phone: user.phone,
    role: user.role,
  };
}
