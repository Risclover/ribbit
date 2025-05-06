import React from "react";
import { useAuthFlow } from "@/context";
import { AuthFormInput, AuthModalLayout, FormHeader, SignInSwitch } from "..";
import { useLoginForm } from "../../hooks";

/**
 * Allows existing users to log in with their email and password.
 * - formType: type of form displayed; relevant for topbar button ("close", "back", or "go home")
 */
export const LoginForm = ({ formType }) => {
  const { closeModal, view } = useAuthFlow();
  const {
    emailInputProps,
    passwordInputProps,
    emailBlurred,
    passwordBlurred,
    submitBtn,
    handleLogin,
  } = useLoginForm();

  return (
    <AuthModalLayout
      active={view}
      onClose={closeModal}
      title="Log In"
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={submitBtn}
      onSubmit={handleLogin}
    >
      <div className="login-form-container">
        <div className="login-form">
          {/* user agreement & demo button */}
          <FormHeader />
          {/* email input */}
          <AuthFormInput props={emailInputProps} blurred={emailBlurred} />
          {/* password input */}
          <AuthFormInput props={passwordInputProps} blurred={passwordBlurred} />
          {/* button to switch to sign up form */}
          <SignInSwitch prompt="New to Ribbit? " linkText="Sign Up" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
