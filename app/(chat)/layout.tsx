import React from 'react'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Using mx-auto to center child element without the need of using flex or something else
    <div className="mx-auto max-w-4xl w-full h-screen">
      {children}
    </div>
  )
}

export default ChatLayout