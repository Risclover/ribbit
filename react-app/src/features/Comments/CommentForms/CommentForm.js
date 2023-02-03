import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { createComment } from "../../../store/comments";
import { getPosts } from "../../../store/posts";

import { Modal } from "../../../context/Modal";
import LoginForm from "../../auth/AuthModal/LoginForm";
import SignUpForm from "../../auth/AuthModal/SignUpForm";

import "../Comments.css";

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

export default function CommentForm({ postId }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if (content.trim().length === 0)
      errors.push("Please add some content to your comment.");
    if (errors.length > 0) {
      setErrors(errors);
      return;
    } else {
      await dispatch(createComment({ content: content.trim() }, postId));
      await dispatch(getPosts());
      setErrors([]);
      setContent(" ");
    }
  };

  useEffect(() => {
    if (content === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setContent("");
      setDisabled(true);
    }
  }, [content]);

  if (!postId) return null;

  return (
    <div className="comment-form-container">
      {user && (
        <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="comment-box">
            Comment as{" "}
            <NavLink to={`/users/${user.id}/profile`}>{user.username}</NavLink>
          </label>
          <div className="post-comment-box">
            <ReactQuill
              theme="snow"
              modules={modules}
              onChange={setContent}
              value={content}
              placeholder="What are your thoughts?"
            />
            <div className="comment-form-button-container">
              <div className="comment-form-errors">
                {errors.length > 0 && errors.map((error) => error)}
              </div>
              {disabled === true ? (
                <button type="submit" className="comment-submit" disabled>
                  Comment
                </button>
              ) : (
                <button type="submit" className="comment-submit">
                  Comment
                </button>
              )}
            </div>
          </div>
        </form>
      )}
      {!user && (
        <form className="comment-form">
          <label for="comment-box">
            <span
              className="log-in-to-comment"
              onClick={() => setShowLoginForm(true)}
            >
              Log in
            </span>
            to comment
          </label>
          <textarea
            className="post-comment-textarea"
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            disabled
          ></textarea>
        </form>
      )}
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
      {showSignupForm && (
        <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
          <SignUpForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
    </div>
  );
}
