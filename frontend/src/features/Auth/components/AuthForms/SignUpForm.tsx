import React from "react";
import { useAuthFlow } from "@/context";
import { AuthFormInput, FormHeader, SignInSwitch, AuthModalLayout } from "../";
import { useSignUpForm } from "../../hooks";

/**
 * Sign-up authentication form (email)
 *
 * @param formType: type of form displayed (relevant for topbar button ("close", "back", or "go home"))
 */

export const SignUpForm = ({ formType }) => {
  const { view, openSignupPage2, closeModal } = useAuthFlow();
  const { emailInputProps, continueBtn, emailBlurred } = useSignUpForm();

  return (
    <AuthModalLayout
      active={view}
      onClose={closeModal}
      title="Sign Up"
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={continueBtn}
      onSubmit={openSignupPage2}
    >
      <div className="signup-form-container">
        <div className="signup-form">
          {/* user agreement & demo button */}
          <FormHeader />
          {/* email input */}
          <AuthFormInput props={emailInputProps} blurred={emailBlurred} />
          {/* button to switch to login form */}
          <SignInSwitch prompt="Already a ribbitor? " linkText="Log In" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
