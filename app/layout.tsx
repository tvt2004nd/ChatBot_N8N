import type { Metadata } from "next";
import "./globals.css";
import { FileProvider } from "./FileContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Home",
  description: "Đây là trang chủ",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <FileProvider>{children}</FileProvider>
      </body>
    </html>
  );
}
