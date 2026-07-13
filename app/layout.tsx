import type { Metadata } from "next";
import "./globals.css";
import { FileProvider } from "./FileContext";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Home",
  description: "Đây là trang chủ",
};

export const maxDuration = 300; // Cho phép action chạy tối đa 5 phút (nếu platform hỗ trợ)

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <FileProvider role={user?.role || "user"}>{children}</FileProvider>
      </body>
    </html>
  );
}
