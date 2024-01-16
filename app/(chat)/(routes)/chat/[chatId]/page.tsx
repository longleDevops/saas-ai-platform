import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    // This chatId must match with dynamic route [chatId]
    chatId: string;
  }
}
const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        // Only load messages matched with userId, not loading all of them. 
        where: {
          userId,
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  if (!companion) {
    return redirect("/")
  }
  return (
    <ChatClient companion={companion} />
  )
}

export default ChatIdPage