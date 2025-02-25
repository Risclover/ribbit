import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";
import "./ModalContext.css";
import { useScrollLock } from "hooks";

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

export function Modal({ onClose, children, title, open }) {
  useScrollLock(open);
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <div id="modal-topbar">
          <h1 className="login-form-title">{title}</h1>
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
