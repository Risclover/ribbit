import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../../store/posts";
import { useHistory } from "react-router-dom";
import "./PostForm.css";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(addPost({ title, content }));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setTitle("");
      setContent("");
      history.push("/posts");
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
        <div className="create-post-form-errors">
          {errors && errors.length > 0
            ? errors.map((error) => <div>{error}</div>)
            : ""}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
