import React, { useRef } from "react";
import { useFocusTrap } from "@/hooks";
import { useAuthModalLayout } from "../hooks";

/**
 * Provides the overall structure for an auth modal: top bar, scroll container, footer, etc.
 * 
 * @param active: which auth form is currently active (i.e. login, signup page 1, etc)
 * @param onClose: function to run when modal is closed
 * @param title: title to display on the form
 * @param topbarBtn: topbar button to display
 * @param footerBtn: footer button to display
 * @param formType: type of form displayed; matters for the topbar button
 */
export function AuthModalLayout({
  active,
  onClose,
  title,
  topbarBtn = "close",
  footerBtn,
  onSubmit,
  children,
}) {
  const wrapperRef = useRef();
  const containerRef = useRef();

  useFocusTrap(active, wrapperRef);

  const { handleScroll, topbarClassName, footerClassName, renderTopbarButton } =
    useAuthModalLayout({
      containerRef,
      topbarBtn,
      onClose,
    });

  return (
    <form className="auth-layout" ref={wrapperRef} onSubmit={onSubmit}>
      <div className={topbarClassName}>
        <span />
        {renderTopbarButton}
      </div>
      <div
        className="auth-modal-form-container"
        onScroll={handleScroll}
        ref={containerRef}
      >
        {title && <h1 className="auth-modal-title">{title}</h1>}
        {children}
      </div>
      <div className={footerClassName}>{footerBtn}</div>
    </form>
  );
}
