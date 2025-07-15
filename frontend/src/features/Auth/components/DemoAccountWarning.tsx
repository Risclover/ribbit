import React from "react";
import { useFocusTrap } from "@/hooks";
import { useDemoAccountWarning } from "../hooks";
import { WarningIcon } from "@/assets";
import "../styles/DemoAccountWarning.css";

/**
 * Shows a warning about using the shared "Demo" account.
 * - setShowDemoWarning/showDemoWarning: setter for whether or not the warning is visible
 */
export function DemoAccountWarning({ setShowDemoWarning, showDemoWarning }) {
  const { handleCancel, handleLogin, handleSignup, wrapperRef } =
    useDemoAccountWarning({
      setShowDemoWarning,
    });

  useFocusTrap(showDemoWarning, wrapperRef);

  return (
    <div className="warning-container" ref={wrapperRef}>
      <div className="warning-content">
        {/* Title */}
        <div className="warning-content-title">
          <img className="warning-icon" src={WarningIcon} alt="Warning" />
          <h3>WARNING: Shared Account</h3>
        </div>

        {/* Warning body */}
        <div className="warning-content-body">
          <p>
            Prior to logging into Ribbit's shared Demo account, please be aware
            that it is accessible to all users and exclusively meant for touring
            Ribbit's features.
          </p>
          <p>
            Avoid sharing personal information. For enhanced security, create
            your own Ribbit account instead.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="warning-buttons">
        <button className="warning-button-left" onClick={handleCancel}>
          Cancel
        </button>
        <div className="warning-buttons-right">
          <button className="warning-button-middle" onClick={handleSignup}>
            Sign Up
          </button>
          <button className="warning-button-right" onClick={handleLogin}>
            Continue to Demo
          </button>
        </div>
      </div>
    </div>
  );
}
