import { Companion, Message } from "@prisma/client"
import { ChatMessage } from "@/components/chat-message";

interface ChatMessagesProps {
  companion: Companion;
  isLoading: boolean;
  messages: any[];
}

export const ChatMessages = ({ companion, isLoading, messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      <ChatMessage
        role="user"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
    </div>
  )
}