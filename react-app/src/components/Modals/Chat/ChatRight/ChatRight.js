import React from 'react'
import ChatTitleBar from './ChatTitleBar'
import ChatMessages from './ChatMessages/ChatMessages'
import ChatInput from './ChatInput/ChatInput'

export default function ChatRight() {
  return (
    <div className="chat-right-container">
        <ChatTitleBar />
        <ChatMessages />
        <ChatInput />
    </div>
  )
}
