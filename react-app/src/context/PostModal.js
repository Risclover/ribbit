import React, { useContext, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { CgNotes } from "react-icons/cg";
import { SinglePostKarmabar } from "@/features";

import {
  getSinglePost,
  getCommunities,
  getPosts,
  addViewedPost,
  getViewedPosts,
} from "@/store";

import { PostPopup } from "@/components";
import "./PostModal.css";

const PostModalContext = React.createContext();

export function PostModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <PostModalContext.Provider value={value}>
        {children}
      </PostModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function PostModal({ onClose, post }) {
  const postRef = useRef(null);
  const dispatch = useDispatch();
  const modalNode = useContext(PostModalContext);
  if (!modalNode) return null;

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    dispatch(getSinglePost(post.id));
    dispatch(getCommunities());
    dispatch(getPosts());

    dispatch(addViewedPost(post.id))
      .then(() => {
        dispatch(getViewedPosts());
      })
      .catch((error) => console.error("Failed to add viewed post:", error));
  }, []);

  return ReactDOM.createPortal(
    <div className="post-modal-background" onClick={onClose}>
      <div className="post-modal-container">
        <div className="post-modal">
          <div
            className="post-modal-top-bar-container"
            onClick={stopPropagation}
          >
            <div className="post-modal-top-bar">
              <div className="post-modal-top-bar-post-info">
                <div className="post-modal-voting">
                  <SinglePostKarmabar post={post} />
                </div>
                <span className="post-modal-icon">
                  <CgNotes />
                </span>
                <div className="post-modal-post-title">{post?.title}</div>
              </div>
              <div className="post-modal-top-bar-close">
                <button
                  className="post-modal-top-bar-close-btn"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.3"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="post-modal-content" onClick={stopPropagation}>
            <PostPopup ref={postRef} post={post} />
          </div>
        </div>
      </div>
    </div>,
    modalNode
  );
}
