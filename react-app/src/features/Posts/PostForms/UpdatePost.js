import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useDispatch, useSelector } from "react-redux";
import { putSinglePost } from "../../../store/posts";

import "./PostForm.css";

const modules = {
  toolbar: [
    [
      "bold",
      "italic",
      "link",
      "strike",
      "code",
      { script: "super" },
      { header: 1 },
    ],
    [{ list: "bullet" }, { list: "ordered" }],
    ["blockquote", "code-block"],
  ],
};

export default function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => Object.values(state.singlePost));

  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let titles = [];
    let contents = [];

    if (title.trim().length === 0)
      titles.push("Please give your post a title.");
    if (content.trim().length === 0)
      contents.push("Please give your post some content.");
    if (titles.length > 0 || contents.length > 0) {
      setTitleErrors(titles);
      setContentErrors(contents);
    } else {
      const data = await dispatch(
        putSinglePost(
          { title: title.trim(), content: content.trim() },
          post[0].id
        )
      );
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            maxLength={300}
          ></textarea>
          {titleErrors.length > 0 &&
            titleErrors.map((error) => (
              <div className="update-post-errors">{error}</div>
            ))}
          <div className="update-title-length">{title?.length}/300</div>
        </div>
        <div className="update-post-form-input">
          <ReactQuill
            theme="snow"
            modules={modules}
            onChange={setContent}
            placeholder="Content"
            value={content}
          />
          {contentErrors.length > 0 &&
            contentErrors.map((error) => (
              <div className="update-post-errors">{error}</div>
            ))}
        </div>
        <div className="update-post-form-buttons">
          <button
            className="update-post-cancel"
            onClick={() => history.push(`/posts/${postId}`)}
          >
            Cancel
          </button>
          <button className="update-post-submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
