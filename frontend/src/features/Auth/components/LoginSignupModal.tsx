import React, { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useLocation } from "react-router-dom";
import { useAuthFlow, AuthModal } from "@/context";
import { SignUpForm, SignUpFormSecondPage, LoginForm } from "./AuthForms";
import "../styles/AuthFormInput.css";
import "../styles/AuthForms.css";

/**
 * Decides which auth form (login, signup-first, signup-second) to render based on view.
 * - formType: type of form displayed; relevant for topbar button ("close", "back", or "go home")
 */
export function LoginSignupModal({ formType }) {
  const location = useLocation();
  const user = useAppSelector((state) => state.session.user);
  const { view, closeModal, openLogin } = useAuthFlow();

  useEffect(() => {
    // If at url "/login" and user is logged out, open the login form
    if (location.pathname === "/login" && !user) openLogin();
  }, []);

  return (
    <AuthModal active={!!view} onClose={closeModal} formType={formType}>
      {view === "login" && <LoginForm formType={formType} />}
      {view === "signup-first" && <SignUpForm formType={formType} />}
      {view === "signup-second" && <SignUpFormSecondPage formType={formType} />}
    </AuthModal>
  );
}
