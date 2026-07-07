import { Metadata } from "next";
import Message from "./_components/Message";

export const metadata: Metadata = {
  title: "Bắt đầu chat",
  description: "Tại đây AI sẽ trả lời cho bạn biết về những thông tin bạn cần",
};
export default function ChatPage() {
  return <Message />;
}
