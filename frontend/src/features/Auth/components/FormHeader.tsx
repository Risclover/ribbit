import React, { useState } from "react";
import { DemoAccountWarning } from "./DemoAccountWarning";
import { GoogleSymbol } from "@/assets";

/**
 * Renders a user agreement text and a "Demo account" button at the top of the auth forms.
 */
export function FormHeader() {
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const BACKEND =
    // use an env var when you need a separate host (dev, staging, etc.)
    process.env.REACT_APP_BACKEND_URL ||
    // empty string → same origin in prod
    "";
  const handleLogin = () =>
    (window.location.href = `${BACKEND}/api/auth/authorize/google`);
  return (
    <>
      <p className="auth-modal-agreement">
        By continuing, you agree to abide by Ribbit's community guidelines and
        understand that your use of Ribbit is subject to our terms and policies.
      </p>
      {/* Alternate ways to log in (Google, Demo) */}
      <button
        className="google-btn"
        tabIndex={0}
        type="button"
        onClick={handleLogin}
      >
        <img src={GoogleSymbol} />
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
      {/* Demo account warning modal */}
      {showDemoWarning && (
        <DemoAccountWarning
          setShowDemoWarning={setShowDemoWarning}
          showDemoWarning={showDemoWarning}
        />
      )}
      {/* Divider between this header and form */}
      <div className="or-dividers">
        <hr className="or-line" />
        <div className="or-label">OR</div>
        <hr className="or-line" />
      </div>
    </>
  );
}
