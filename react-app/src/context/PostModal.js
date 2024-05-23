import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

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

export function PostModal({ onClose }) {
  const modalNode = useContext(PostModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="post-modal">
      <button onClick={onClose}>x</button>
      <div>Hello</div>
    </div>,
    modalNode
  );
}
