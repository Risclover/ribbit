import React, { useState } from "react";
import { Modal } from "../../context";
import { LoginForm, SignUpForm } from "./AuthModal";

export function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div>
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
            loginPage
          />
        </Modal>
      )}
      {showSignupForm && (
        <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
          <SignUpForm
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            loginPage
          />
        </Modal>
      )}
    </div>
  );
}
