import type { Metadata } from "next";
import "./globals.css";
import { FileProvider } from "./FileContext";

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
        <FileProvider>{children}</FileProvider>
      </body>
    </html>
  );
}
