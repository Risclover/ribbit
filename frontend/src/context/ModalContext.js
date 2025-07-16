import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalContext.css";
import { useFocusTrap, useScrollLock } from "@/hooks";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, close, children, title, open }) {
  useScrollLock(open);
  const modalNode = useContext(ModalContext);
  const wrapperRef = useRef(null);

  useFocusTrap(close, wrapperRef);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content" ref={wrapperRef}>
        <div id="modal-topbar">
          <h1 className="auth-modal-title">{title}</h1>
          <button
            className="modal-close-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalNode
  );
}
