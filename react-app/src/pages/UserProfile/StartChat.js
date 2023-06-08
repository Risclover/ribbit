import React, { useState } from "react";

export default function StartChat() {
  const [showChatModal, setShowChatModal] = useState(false);

  return <button className="blue-btn-filled btn-long">Chat</button>;
}
