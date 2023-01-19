import React from "react";
import { useHistory } from "react-router-dom";
import "./CreatePostBar.css";

export default function CreatePostBar() {
  const history = useHistory();
  return (
    <div className="create-post-bar">
      <div className="create-post-bar-user-img">
        <i className="fa-solid fa-circle-user"></i>
      </div>
      <div className="create-post-bar-create">
        <input
          type="text"
          placeholder="Create Post"
          onClick={() => history.push("/posts/submit")}
        />
      </div>
    </div>
  );
}
