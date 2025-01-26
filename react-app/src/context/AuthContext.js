import React, { createContext, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./AuthModalContext.css";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [modalNode, setModalNode] = useState(null);

  return (
    <>
      <AuthModalContext.Provider value={modalNode}>
        {children}
      </AuthModalContext.Provider>
      <div ref={setModalNode} />
    </>
  );
}

export function useAuthModalNode() {
  return useContext(AuthModalContext);
}

/**
 * AuthModal: The modal in which the auth forms (login and signup) live; includes clickable background behind modal
 * - `active` determines if the modal is displayed.
 * - `onClose` is a function to close the modal (click background or close button).
 */
export function AuthModal({ active, onClose, formType, children }) {
  const modalNode = useAuthModalNode();
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    active ? (
      <div className="auth-modal">
        <div
          className="auth-modal-background"
          onClick={() => formType !== "protected" && onClose()}
        />
        <div className="auth-modal-content">{children}</div>
      </div>
    ) : null,
    modalNode
  );
}
