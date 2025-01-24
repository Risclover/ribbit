import React, { useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useModalScrollBorders } from "./useModalScrollBorders";
import { useAuthFlow } from "context/AuthFlowContext";
import { AuthModalCloseBtn } from "assets/icons/AuthModalCloseBtn";
import { AuthModalBackBtn } from "assets/icons/AuthModalBackBtn";

export function useAuthModalLayout({
  containerRef,
  topbarBtn,
  onClose,
  formType,
}) {
  const history = useHistory();
  const wrapperRef = useRef();

  const { openSignupPage1, closeModal } = useAuthFlow();

  const { handleScroll, headerBorder, footerBorder } =
    useModalScrollBorders(containerRef);

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
            <span
              role="button"
              onClick={() => {
                closeModal();
                history.push("/");
              }}
            >
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
            tabIndex={0}
          >
            <AuthModalCloseBtn />
          </button>
        );
      case "back":
        return (
          <button
            aria-label="Back"
            className="auth-modal-back"
            onClick={openSignupPage1}
          >
            <AuthModalBackBtn />
          </button>
        );
      default:
        return null;
    }
  }, [topbarBtn, history, onClose]);
  return {
    handleScroll,
    topbarClassName,
    footerClassName,
    renderTopbarButton,
  };
}
