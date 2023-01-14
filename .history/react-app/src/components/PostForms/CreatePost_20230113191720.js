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
      </form>
    </div>
  );
}
