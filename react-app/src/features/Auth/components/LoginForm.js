import React from "react";
import { useAuthFlow } from "@/context";
import {
  AuthFormInput,
  AuthModalLayout,
  FormHeader,
  SignInSwitch,
} from "../components";
import { useLoginForm } from "../hooks";
import { handleErrors } from "../utils";

/**
 * Login auth form
 * - formType: type of form displayed; relevant for topbar button ("close", "back", or "go home")
 */
export const LoginForm = ({ formType }) => {
  const { emailInputProps, passwordInputProps, submitBtn } = useLoginForm();
  const { closeModal, view, loginFormData } = useAuthFlow();

  return (
    <AuthModalLayout
      active={view}
      onClose={closeModal}
      title="Log In"
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={submitBtn}
    >
      <div className="login-form-container">
        <div className="login-form">
          <FormHeader />
          <AuthFormInput
            props={emailInputProps}
            onBlur={() => handleErrors(loginFormData.email)}
          />
          <AuthFormInput
            props={passwordInputProps}
            onBlur={() => handleErrors(loginFormData.password)}
          />
          <SignInSwitch prompt="New to Ribbit? " linkText="Sign Up" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
