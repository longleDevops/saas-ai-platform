"use client"

import { Companion, Message } from "@prisma/client"
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  companion: Companion;
  isLoading: boolean;
  messages: ChatMessageProps[];
}

export const ChatMessages = ({
  companion,
  isLoading,
  messages = []
}: ChatMessagesProps) => {
  // set the scroll to the lastest chat
  const scrollRef = useRef<ElementRef<"div">>(null);

  // Set cool loading effect if this is the first time user interacts with chat bot
  const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false)

  // set fakeLoading to false after 1 second. 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000)

    // Remember to clear timeout once done.
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  // Scroll to current every time messages length changes
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}

      {/*isLoading is true while submitting the form*/}
      {isLoading && (
        <ChatMessage
          role="system"
          src={companion.src}
          isLoading
        />
      )}

      {/*Scroll the message all the way down to here*/}
      <div ref={scrollRef} />
    </div>
  )
}