import React from "react";

export default function CreatePost() {
  return (
    <div className="create-post-form-container">
      <form className="create-post-form">
        <div className="create-post-header">
          <h1>Create a post</h1>
        </div>
        <div className="create-post-choose-community">
          <select className="choose-community-dropdown">
            <option selected disabled>
              Choose a community
            </option>
          </select>
        </div>
        <div className="create-post-form-input">
          <input
            placeholder="Title"
            type="text"
            className="create-post-input"
          />
        </div>
        <div className="create-post-form-input">
          <textarea placeholder="Text"></textarea>
        </div>
      </form>
    </div>
  );
}
