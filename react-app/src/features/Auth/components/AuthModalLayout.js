import React, { useRef } from "react";
import { useFocusTrap } from "hooks";
import { useAuthModalLayout } from "../hooks";

/**
 * Layout for the auth modal
 * - active: which auth form is currently active (i.e. login, signup page 1, etc)
 * - onClose: function to run when modal is closed
 * - title: title to display
 * - topbarBtn: topbar button to display
 * - footerBtn: footer button to display
 * - formType: type of form displayed; matters for the topbar button
 */
export function AuthModalLayout({
  active,
  onClose,
  title,
  topbarBtn = "close",
  footerBtn,
  formType,
  children,
}) {
  const wrapperRef = useRef();
  const containerRef = useRef();

  useFocusTrap(active, wrapperRef);

  const { handleScroll, topbarClassName, footerClassName, renderTopbarButton } =
    useAuthModalLayout({ containerRef, topbarBtn, onClose, formType });

  return (
    <div className="auth-layout" ref={wrapperRef}>
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
    </div>
  );
}
