import React from "react";
import { useAuthFlow, AuthModal } from "@/context";
import { LoginForm } from "./AuthForms/LoginForm";
import { SignUpForm, SignUpFormSecondPage } from "./AuthForms";
import "../styles/AuthFormInput.css";
import "../styles/AuthForms.css";

/**
 * Decides which auth form (login, signup-first, signup-second) to render based on view.
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
