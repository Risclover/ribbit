import React from "react";
import { CommunityInfoBox } from "./CommunityInfoBox";

export function CommunityFeedAbout({ showAbout, setShowAbout, community }) {
  return (
    <div className="community-feed-about-container">
      <div className="community-feed-about-btns">
        <button
          onClick={() => setShowAbout(false)}
          className={`community-feed-about-option${showAbout ? "" : " active"}`}
        >
          Posts
        </button>
        <button
          onClick={() => setShowAbout(true)}
          className={`community-feed-about-option${showAbout ? " active" : ""}`}
        >
          About
        </button>
      </div>
    </div>
  );
}
