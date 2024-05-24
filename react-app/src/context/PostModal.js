import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import "./PostModal.css";
const PostModalContext = React.createContext();
import { CgNotes } from "react-icons/cg";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { SinglePostKarmabar } from "features";

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

export function PostModal({ onClose, children, post }) {
  const modalNode = useContext(PostModalContext);
  if (!modalNode) return null;

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

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
                <CgNotes />
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
            {children}
          </div>
        </div>
      </div>
    </div>,
    modalNode
  );
}
