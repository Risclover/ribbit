import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, putSinglePost } from "../../store/posts";
import "./PostForm.css";

export default function UpdatePost({ setShowEditModal, showEditModal }) {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => Object.values(state.singlePost));
  console.log("This is my post:", post);
  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let titles = [];
    let contents = [];

    if (title.length === 0) titles.push("Please give your post a title.");
    if (content.length === 0)
      contents.push("Please give your post some content.");
    if (titles.length > 0 || contents.length > 0) {
      setTitleErrors(titles);
      setContentErrors(contents);
    } else {
      const data = dispatch(putSinglePost({ title, content }, post[0].id));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        history.push(`/posts/${postId}`);
      }
    }
  };

  return (
    <div className="update-post-form-container">
      <div className="update-post-form-header">Update post</div>
      <form className="update-post-form" onSubmit={handleSubmit}>
        <div className="update-post-form-input">
          <textarea
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          ></textarea>
          {titleErrors.length > 0 &&
            titleErrors.map((error) => (
              <div className="update-post-errors">{error}</div>
            ))}
          <div className="update-title-length">{title.length}/300</div>
        </div>
        <div className="update-post-form-input">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Content"
          ></textarea>
          {contentErrors.length > 0 &&
            contentErrors.map((error) => (
              <div className="update-post-errors">{error}</div>
            ))}
        </div>
        <button className="update-post-submit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
