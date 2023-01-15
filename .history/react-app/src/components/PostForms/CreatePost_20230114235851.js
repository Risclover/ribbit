import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../../store/posts";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import "./PostForm.css";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());

    // REMEMBER: If no community, also set it to disabled.
    if (title.length === 0 || content.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [dispatch, title, content]);

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
        <div className="create-post-header">Create a post</div>
        <div className="create-post-choose-community">
          <select className="choose-community-dropdown">
            <option selected disabled>
              Choose a community
            </option>
          </select>
        </div>
        <div className="create-post-content">
          <div className="create-post-form-input">
            <textarea
              placeholder="Title"
              className="create-post-input title-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              maxLength={300}
            ></textarea>
            <div className="create-post-form-title-length">
              <span className="create-post-title-length">
                {title.length}/300
              </span>
            </div>
          </div>
          <div className="create-post-form-input">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="create-post-input content-input"
              value={content}
              maxLength={4000}
              placeholder="Text"
            ></textarea>
          </div>
          <div className="create-post-form-errors">
            {errors && errors.length > 0
              ? errors.map((error) => <div>{error}</div>)
              : ""}
          </div>
          <div className="create-post-form-buttons">
            <button
              className="create-post-form-cancel"
              onClick={() => history.push("/posts")}
            >
              Cancel
            </button>

            <button
              disabled={disabled}
              type="submit"
              className="create-post-form-submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
