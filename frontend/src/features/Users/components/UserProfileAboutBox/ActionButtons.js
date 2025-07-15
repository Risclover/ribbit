import React from "react";
import { FollowBtn } from "@/components";
import { SendMessage } from "@/pages";
import { useAuthFlow } from "@/context";
import { useAppSelector } from "@/store";

export function ActionButtons({ about, user, currentUser, userId, username }) {
  const { openLogin } = useAuthFlow();
  const follows = useAppSelector((state) => state.followers.follows);

  if (!currentUser) {
    return (
      <div className="user-profile-buttons">
        {["Follow", "Chat", "Send Message"].map((txt) => (
          <button
            key={txt}
            className="blue-btn-filled btn-long"
            onClick={openLogin}
          >
            {txt}
          </button>
        ))}
      </div>
    );
  }

  if (about.isMe) return null;

  return (
    <div className="user-profile-buttons">
      <div className="half-btns">
        <FollowBtn user={user} />
        <button className="blue-btn-filled btn-long" onClick={about.startChat}>
          Chat
        </button>
      </div>

      <SendMessage
        userId={userId}
        currentUser={currentUser}
        username={username}
      />
    </div>
  );
}
