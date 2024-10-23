import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import "./AuthModal.css";

const AuthModalContext = React.createContext();

export function AuthModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <AuthModalContext.Provider value={value}>
        {children}
      </AuthModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function AuthModal({
  onClose,
  children,
  title,
  topbarBtn,
  footerBtn,
  onSubmit,
}) {
  const history = useHistory();
  const modalNode = useContext(AuthModalContext);
  if (!modalNode) return null;

  // State to track header and footer border visibility
  const [headerBorder, setHeaderBorder] = useState(false);
  const [footerBorder, setFooterBorder] = useState(false);
  const containerRef = useRef(null); // Ref for the scrollable container

  const handleScroll = () => {
    const container = containerRef.current;
    const scrollAtTop = container.scrollTop === 0;
    const scrollAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;

    // Enable header border if scrolled down, disable if scrolled to the top
    setHeaderBorder(!scrollAtTop);

    // Enable footer border if scrolled up, disable if scrolled to the bottom
    setFooterBorder(!scrollAtBottom);
  };

  return ReactDOM.createPortal(
    <div className="auth-modal">
      <div className="auth-modal-background" onClick={onClose} />
      <div className="auth-modal-content">
        <div
          className={`auth-modal-topbar ${
            headerBorder ? "header-border" : ""
          } ${topbarBtn === "back" ? "justify-left" : ""}`}
        >
          <span></span>
          {topbarBtn === "none" && (
            <div className="sign-in-switch">
              <span onClick={() => history.push("/")}>Go home</span>
            </div>
          )}
          {topbarBtn === "close" && topbarBtn !== "none" ? (
            <button className="auth-modal-close" onClick={onClose}>
              <svg
                rpl=""
                fill="currentColor"
                height="16"
                icon-name="close-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
              </svg>
            </button>
          ) : topbarBtn === "back" && topbarBtn !== "none" ? (
            <button className="auth-modal-back" onClick={onClose}>
              <svg
                rpl=""
                fill="#000000"
                height="20"
                icon-name="back-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>
        <form className="auth-form" autoComplete="off" onSubmit={onSubmit}>
          <div
            className="auth-modal-form-container"
            onScroll={handleScroll}
            ref={containerRef}
          >
            <h1 className="auth-modal-title">{title}</h1>
            {children}
          </div>
          <div
            className={`auth-modal-footer ${
              footerBorder ? "footer-border" : ""
            }`}
          >
            {footerBtn}
          </div>
        </form>
      </div>
    </div>,
    modalNode
  );
}
