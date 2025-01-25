import React from "react";
import { useAuthFlow } from "@/context";
import {
  AuthFormInput,
  AuthModalLayout,
  FormHeader,
  SignInSwitch,
} from "../components";
import { useLoginForm } from "../hooks";

/**
 * Login auth form
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
      title="Log In"
      onClose={closeModal}
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={submitBtn}
      onSubmit={handleLogin}
      active={view}
    >
      <div className="login-form-container">
        <div className="login-form">
          <FormHeader />
          <AuthFormInput props={emailInputProps} blurred={emailBlurred} />
          <AuthFormInput props={passwordInputProps} blurred={passwordBlurred} />
          <SignInSwitch prompt="New to Ribbit? " linkText="Sign Up" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
