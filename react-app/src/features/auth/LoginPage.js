import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./AuthModal/LoginForm";
import SignUpForm from "./AuthModal/SignUpForm";

export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    setShowLoginForm(true);
  }, []);
  return (
    <div>
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
            val="loginpage"
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
            val="loginpage"
          />
        </Modal>
      )}
    </div>
  );
}
