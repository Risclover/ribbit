import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
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

export function PostModal({ onClose, children }) {
  const modalNode = useContext(PostModalContext);
  if (!modalNode) return null;


  return ReactDOM.createPortal(
    <div className="post-modal-background" onClick={onClose}>
      <div className="post-modal-container">
        <div className="post-modal">
          <div className="post-modal-top-bar-container">
            <div className="post-modal-top-bar"></div>
          </div>
          {children}
        </div>
      </div>
    </div>,
    modalNode
  );
}
