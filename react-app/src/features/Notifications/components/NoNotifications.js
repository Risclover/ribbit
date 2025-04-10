import React from "react";
import { NavLink } from "react-router-dom";
import { ribbitLogos } from "@/assets";

export function NoNotifications({ onClick }) {
  return (
    <div className="no-notifications">
      <img
        src={ribbitLogos.sparkle}
        alt="Sparkly Frog"
        className="sparkly-frog"
      />
      <h1 className="no-notifications-title">
        You don't have any activity yet
      </h1>
      <p>
        That's okay, maybe you just need the right inspiration. Try posting in
        c/CasualConversation, a popular community for discussion.
      </p>
      <NavLink
        to="/c/CasualConversation"
        className="blue-btn-filled no-notifications-btn"
        onClick={onClick}
      >
        Visit c/CasualConversation
      </NavLink>
    </div>
  );
}
