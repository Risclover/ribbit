import React, { useState } from "react";
import { Modal } from "../../context";
import { LoginForm, SignUpForm } from "./AuthModal";

export function LoginSignupModal({ btnText, className }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div style={{ color: "white" }}>
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setShowLoginForm(true);
        }}
      >
        {btnText}
      </button>
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
      {showSignupForm && (
        <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
          <SignUpForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
    </div>
  );
}
