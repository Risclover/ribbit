import React from "react";
import { AuthFormInput } from "./AuthFormInput";
import { handleErrors } from "../utils/loginFormValidation";
import { FormHeader } from "./FormHeader";
import SignInSwitch from "./SignInSwitch";
import { AuthModal } from "context";
import "../styles/AuthModal.css";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = ({
  setShowLoginForm,
  setShowSignupForm,
  formType,
}) => {
  const {
    emailInputProps,
    passwordInputProps,
    setLoginEmail,
    setLoginPassword,
    loginEmail,
    loginPassword,
    handleLogin,
    submitBtn,
  } = useLoginForm();
  return (
    <AuthModal
      title="Log In"
      onClose={() => setShowLoginForm(false)}
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={submitBtn}
      onSubmit={handleLogin}
    >
      <div className="login-form-container">
        <div className="login-form">
          <FormHeader
            setShowSignupForm={setShowSignupForm}
            setShowLoginForm={setShowLoginForm}
          />
          <AuthFormInput
            props={emailInputProps}
            onChange={setLoginEmail}
            onBlur={() => handleErrors(loginEmail)}
          />
          <AuthFormInput
            props={passwordInputProps}
            onChange={setLoginPassword}
            onBlur={() => handleErrors(loginPassword)}
          />
          <SignInSwitch
            prompt="New to Ribbit? "
            onClick={() => {
              setShowLoginForm(false);
              setShowSignupForm(true);
            }}
            linkText="Sign Up"
          />
        </div>
      </div>
    </AuthModal>
  );
};
