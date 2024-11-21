import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import "./AuthModal.css";

const AuthModalContext = React.createContext();

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

  const [headerBorder, setHeaderBorder] = useState(false);
  const [footerBorder, setFooterBorder] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const isAtTop = container.scrollTop === 0;
    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;

    setHeaderBorder(!isAtTop);
    setFooterBorder(!isAtBottom);
  }, []);

  const topbarClassName = useMemo(() => {
    const classes = ["auth-modal-topbar"];
    if (headerBorder) classes.push("header-border");
    if (topbarBtn === "back") classes.push("justify-left");
    return classes.join(" ");
  }, [headerBorder, topbarBtn]);

  const footerClassName = useMemo(() => {
    return `auth-modal-footer ${footerBorder ? "footer-border" : ""}`;
  }, [footerBorder]);

  const renderTopbarButton = useMemo(() => {
    switch (topbarBtn) {
      case "none":
        return (
          <div className="sign-in-switch">
            <span role="button" onClick={() => history.push("/")}>
              Go home
            </span>
          </div>
        );
      case "close":
        return (
          <button
            aria-label="Close"
            className="auth-modal-close"
            onClick={onClose}
          >
            {/* Close icon SVG */}
            <svg
              fill="currentColor"
              height="16"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.442 2.442l-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
            </svg>
          </button>
        );
      case "back":
        return (
          <button
            aria-label="Back"
            className="auth-modal-back"
            onClick={onClose}
          >
            {/* Back icon SVG */}
            <svg
              fill="#000000"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
            </svg>
          </button>
        );
      default:
        return null;
    }
  }, [topbarBtn, history, onClose]);

  return ReactDOM.createPortal(
    <div className="auth-modal">
      <div className="auth-modal-background" onClick={onClose} />
      <div className="auth-modal-content">
        <div className={topbarClassName}>
          <span></span>
          {renderTopbarButton}
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
          <div className={footerClassName}>{footerBtn}</div>
        </form>
      </div>
    </div>,
    modalNode
  );
}
