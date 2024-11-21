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
import { AuthModalCloseBtn } from "assets/icons/AuthModalCloseBtn";
import { AuthModalBackBtn } from "assets/icons/AuthModalBackBtn";

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
            <AuthModalCloseBtn />
          </button>
        );
      case "back":
        return (
          <button
            aria-label="Back"
            className="auth-modal-back"
            onClick={onClose}
          >
            <AuthModalBackBtn />
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
