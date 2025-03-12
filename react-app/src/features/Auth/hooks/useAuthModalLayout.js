import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { AuthModalCloseBtn, AuthModalBackBtn } from "@/assets";
import { useModalScrollBorders } from "./useModalScrollBorders";
import { useScrollLock } from "hooks";
import { unlockScroll } from "utils/scrollLock";

export function useAuthModalLayout({
  containerRef,
  topbarBtn,
  onClose,
  active,
  setActive,
}) {
  const history = useHistory();

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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  closeModal();
                  history.push("/");
                }
              }}
              onClick={() => {
                closeModal();
                history.push("/");
              }}
              tabIndex={0}
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
