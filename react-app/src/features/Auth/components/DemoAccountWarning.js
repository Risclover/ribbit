// components/DemoAccountWarning.js
import React from "react";
import { WarningIcon } from "@/assets";
import "../styles/DemoAccountWarning.css";
import { useDemoAccountWarning } from "../hooks/useDemoAccountWarning";

export function DemoAccountWarning({
  setShowDemoWarning,
  setShowLoginForm,
  setShowSignupForm,
}) {
  const { handleCancel, handleLogin, handleSignup } = useDemoAccountWarning({
    setShowDemoWarning,
    setShowLoginForm,
    setShowSignupForm,
  });

  return (
    <div className="warning-container">
      <div className="warning-content">
        <div className="warning-content-title">
          <img className="warning-icon" src={WarningIcon} alt="Warning" />
          <h3>WARNING: Shared Account</h3>
        </div>
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
      <div className="warning-buttons">
        <button className="warning-button-left" onClick={handleCancel}>
          Cancel
        </button>
        <button className="warning-button-middle" onClick={handleSignup}>
          Sign Up
        </button>
        <button className="warning-button-right" onClick={handleLogin}>
          Continue to Demo
        </button>
      </div>
    </div>
  );
}
