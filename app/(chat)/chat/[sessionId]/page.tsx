import { Metadata } from "next";
import Message from "../_components/Message";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};
export default async function SessionChat({ params }: Props) {
  const { sessionId } = await params;

  return <Message sessionId={sessionId} />;
}
