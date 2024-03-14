import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Auth({ onClose, children, title, topbarBtn, mainBtn }) {
  const modalNode = useContext(AuthContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className="auth-modal-container">
      <div className="auth-modal-background" onClick={onClose} />
      <div className="auth-modal">
        <div className="auth-modal-topbar">
          {topbarBtn === "close" ? (
            <button className="auth-modal-close-btn">X</button>
          ) : (
            <button className="auth-modal-back-btn">&lt;-</button>
          )}
        </div>
        <div className="auth-modal-main">{children}</div>
        <div className="auth-modal-footer">{mainBtn}</div>
      </div>
    </div>
  );
}
