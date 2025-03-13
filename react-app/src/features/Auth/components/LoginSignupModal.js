import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
  const user = useSelector((state) => state.session.user);

  const { view, closeModal, openLogin } = useAuthFlow();
  const location = useLocation();

  useEffect(() => {
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
