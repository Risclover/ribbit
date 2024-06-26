import React from "react";
import { ribbitBanners } from "@/assets";
import "./RibbitRules.css";

export function RibbitRules() {
  return (
    <div className="ribbit-rules-box">
      <div className="ribbit-rules-title">
        <img
          className="ribbit-rules-frog"
          src={ribbitBanners.FrogLogo}
          alt="Frog logo"
        />
        Posting to Ribbit
      </div>
      <div className="ribbit-rules-rule">1. Remember the human</div>
      <div className="ribbit-rules-rule">
        2. Behave like you would in real life
      </div>
      <div className="ribbit-rules-rule">
        3. Look for the original source of content
      </div>
      <div className="ribbit-rules-rule">
        4. Search for duplicates before posting
      </div>
      <div className="ribbit-rules-rule">5. Read the community's rules</div>
    </div>
  );
}
