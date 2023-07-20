import React from 'react'
import ChatLeft from './ChatLeft/ChatLeft'
import ChatRight from './ChatRight/ChatRight'
import "./Chat.css"


export default function Chat() {
  return (
    <div className="chat-container">
        <ChatLeft />
        <ChatRight />
    </div>
  )
}
