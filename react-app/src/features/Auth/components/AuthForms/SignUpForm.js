import React from "react";
import { useAuthFlow } from "@/context";
import { AuthFormInput, FormHeader, SignInSwitch, AuthModalLayout } from "..";
import { useSignUpForm } from "../../hooks";
import { handleEmailErrors } from "../../utils";

/**
 * Allows users to enter an email to start sign-up.
 * - formType: The type of form it is; controls the topmost form button ('close', 'back', or 'go home')
 */

export const SignUpForm = ({ formType }) => {
  const { signupFormData, view, openSignupPage2, closeModal } = useAuthFlow();
  const { emailInputProps, emailTaken, continueBtn, emailBlurred } =
    useSignUpForm();

  return (
    <AuthModalLayout
      topbarBtn={formType === "protected" ? "none" : "close"}
      title="Sign Up"
      onClose={closeModal}
      openSecondPage={openSignupPage2}
      footerBtn={continueBtn}
      onSubmit={openSignupPage2}
      active={view}
    >
      <div className="signup-form-container">
        <div className="signup-form">
          {/* user agreement & demo button */}
          <FormHeader />
          {/* email input */}
          <AuthFormInput
            props={emailInputProps}
            testId="Email"
            blurred={emailBlurred}
            onBlur={() => handleEmailErrors(signupFormData.email, emailTaken)}
          />
          {/* button to switch to login form */}
          <SignInSwitch prompt="Already a ribbitor? " linkText="Log In" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
