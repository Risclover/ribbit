import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";
import { putSinglePost } from "@/store";
import "react-quill/dist/quill.snow.css";
import "./CreatePost/PostForm.css";

// keep toolbar identical to create form to avoid stripping formats
const modules = {
  keyboard: {
    bindings: {
      tab: {
        key: 9,
        handler: function () {
          return true;
        },
      },
    },
  },
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

// (optional) explicit whitelist; keeps Quill from discarding formats on load
const formats = [
  "bold",
  "italic",
  "link",
  "strike",
  "code",
  "script",
  "header",
  "list",
  "bullet",
  "blockquote",
  "code-block",
];

export function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const post = useAppSelector((state) => state.posts.posts[+postId]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML string from Quill
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  // ⬅️ hydrate when the post finally arrives/changes
  useEffect(() => {
    if (post) {
      setTitle(post.title ?? "");
      // If you store Quill HTML: set it directly
      setContent(post.content ?? "");

      // If instead you store Quill Delta JSON, convert or pass it directly:
      // const delta = typeof post.content === "string" ? JSON.parse(post.content) : post.content;
      // setContent(delta);
    }
  }, [post?.id, post?.title, post?.content]); // be explicit so it updates reliably

  useEffect(() => {
    setDisabled(!(title?.trim().length > 0));
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titles = [];
    const contents = [];

    if (!title?.trim()) titles.push("Please give your post a title.");
    // (optional) validate content if you require it

    if (titles.length || contents.length) {
      setTitleErrors(titles);
      setContentErrors(contents);
      return;
    }

    await dispatch(putSinglePost({ title, content }, post?.id));
    history.push(`/posts/${postId}`);
  };

  // Show nothing (or a loader) until post is ready to avoid a flash of empty editor
  if (!post) return null;

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
          />
          {titleErrors.length > 0 &&
            titleErrors.map((error) => (
              <div key={uuidv4()} className="update-post-errors">
                {error}
              </div>
            ))}
          <div className="update-title-length">{title?.length}/300</div>
        </div>

        <div className="update-post-form-input">
          <ReactQuill
            key={post.id} // forces a clean mount when switching posts
            theme="snow"
            modules={modules}
            formats={formats} // keep formats consistent
            value={content} // HTML string (or Delta if you store Delta)
            onChange={setContent}
            placeholder="Content"
          />
          {contentErrors.length > 0 &&
            contentErrors.map((error) => (
              <div key={uuidv4()} className="update-post-errors">
                {error}
              </div>
            ))}
        </div>

        <div className="update-post-form-buttons">
          <button
            className="update-post-cancel"
            type="button"
            onClick={() => history.push(`/posts/${postId}`)}
          >
            Cancel
          </button>
          <button
            className="update-post-submit"
            disabled={disabled}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
