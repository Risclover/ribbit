import React from "react";
import "./CreatePostBar.css";

export default function CreatePostBar() {
  return (
    <div className="create-post-bar">
      <div className="create-post-bar-user-img">
        <i className="fa-solid fa-circle-user"></i>
      </div>
      <div className="create-post-bar-create">
        <input type="text" placeholder="Create Post" />
      </div>
    </div>
  );
}
