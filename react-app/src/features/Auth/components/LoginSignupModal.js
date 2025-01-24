import React from "react";
import { AuthModal } from "context";
import { useAuthFlow } from "context/AuthFlowContext";
import { LoginForm } from "./LoginForm";
import { SignUpForm, SignUpFormSecondPage } from "./SignUpForm";

/**
 * General auth modal (login, signup, and signup page 2)
 * - formType: type of form displayed; relevant for topbar button ("close", "back", or "go home")
 */
export function LoginSignupModal({ formType }) {
  const { view, closeModal } = useAuthFlow();

  return (
    <AuthModal active={!!view} onClose={closeModal} formType={formType}>
      {view === "login" && <LoginForm formType={formType} />}
      {view === "signup-first" && <SignUpForm formType={formType} />}
      {view === "signup-second" && <SignUpFormSecondPage formType={formType} />}
    </AuthModal>
  );
}
