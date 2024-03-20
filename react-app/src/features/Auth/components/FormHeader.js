import React, { useState } from "react";
import { DemoAccountWarning } from "./DemoAccountWarning";

export function FormHeader({ setShowSignupForm, setShowLoginForm }) {
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  const handleShowWarning = (e) => {
    e.preventDefault();
    setShowDemoWarning(true);
  };

  return (
    <>
      <p className="auth-modal-agreement">
        By continuing, you agree to abide by Ribbit's community guidelines and
        understand that your use of Ribbit is subject to our terms and policies.
      </p>
      <button className="demo-btn" onClick={handleShowWarning} type="button">
        <i className="fa-regular fa-address-card demo-id"></i>
        Continue as Demo User <span></span>
      </button>
      {showDemoWarning && (
        <DemoAccountWarning
          setShowSignupForm={setShowSignupForm}
          setShowDemoWarning={setShowDemoWarning}
          setShowLoginForm={setShowLoginForm}
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
