import React, { useState } from "react";
import { DemoAccountWarning } from "./DemoAccountWarning";

/**
 * Renders a user agreement text and a “Demo account” button at the top of the auth forms.
 * - displays general user agreement + demo account usage button
 */
export function FormHeader() {
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const handleLogin = () => {
    // Imperative redirect
    window.location.href = "http://localhost:5000/authorize/google";
  };
  return (
    <>
      <p className="auth-modal-agreement">
        By continuing, you agree to abide by Ribbit's community guidelines and
        understand that your use of Ribbit is subject to our terms and policies.
      </p>
      <button
        className="google-btn"
        tabIndex={0}
        type="button"
        onClick={handleLogin}
      >
        <img src="https://developers.google.com/static/identity/images/g-logo.png" />
        Continue with Google<span></span>
      </button>
      <button
        className="demo-btn"
        tabIndex={0}
        onClick={() => setShowDemoWarning(true)}
        type="button"
      >
        <i className="fa-regular fa-address-card demo-id"></i>
        Continue as Demo User <span></span>
      </button>
      {showDemoWarning && (
        <DemoAccountWarning
          setShowDemoWarning={setShowDemoWarning}
          showDemoWarning={showDemoWarning}
        />
      )}
      <div className="or-dividers">
        <hr className="or-line" />
        <div className="or-label">OR</div>
        <hr className="or-line" />
      </div>
    </>
  );
}
