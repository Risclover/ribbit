import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { CreateCommunity } from "@/features";
import { ribbitBanners } from "@/assets";

export function AboutBox({ title, description, user }) {
  const history = useHistory();

  return (
    <div className="posts-home-box">
      <div
        className="posts-home-box-banner"
        style={{
          background: `url(${ribbitBanners.RibbitBanner}) center / cover no-repeat`,
        }}
      >
        {/* <img src={ribbitBanners.RibbitBanner} alt="Ribbit banner" /> */}
      </div>
      <div className="posts-home-box-content">
        <h1>{title}</h1>
        <p>{description}</p>
        {user && (
          <div className="posts-home-box-buttons">
            <NavLink to="/submit" className="blue-btn-filled btn-long">
              Create Post
            </NavLink>
            <CreateCommunity />
          </div>
        )}
      </div>
    </div>
  );
}
