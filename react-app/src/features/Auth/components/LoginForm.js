import React from "react";
import { AuthModal } from "@/context";
import { AuthFormInput, FormHeader, SignInSwitch } from "../components";
import { useLoginForm } from "../hooks";
import { handleErrors } from "../utils";

export const LoginForm = ({
  setShowLoginForm,
  setShowSignupForm,
  formType,
  switchAuthForms,
  showLoginForm,
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
      active={showLoginForm}
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
            switchAuthForms={switchAuthForms}
            linkText="Sign Up"
          />
        </div>
      </div>
    </AuthModal>
  );
};
