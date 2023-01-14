import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/posts";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(addPost({ title, content }));
    if (data) {
      setErrors(data.errors);
    }
  };

  return (
    <div className="create-post-form-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="create-post-form-input">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Text"
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
