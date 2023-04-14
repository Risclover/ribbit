import React from "react";
import RibbitBanner from "../../images/ribbit-banners/ribbit_banner.png";
import { useHistory } from "react-router-dom";
import CreateCommunity from "./CreateCommunity";

export default function AboutBox({ title, description, user }) {
  const history = useHistory();

  return (
    <div className="posts-home-box">
      <img src={RibbitBanner} alt="Ribbit banner" />
      <div className="posts-home-box-content">
        <h1>{title}</h1>
        <p>{description}</p>
        {user && (
          <div className="posts-home-box-buttons">
            <button
              className="blue-btn-filled btn-long"
              onClick={() => history.push("/c/submit")}
            >
              Create Post
            </button>
            <CreateCommunity />
          </div>
        )}
      </div>
    </div>
  );
}
