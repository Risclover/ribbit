import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "../../features/auth/AuthModal/SignUpForm";

export default function LoginForm({ btn }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div>
      <span onClick={() => setShowLoginForm(true)}>{btn}</span>
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
