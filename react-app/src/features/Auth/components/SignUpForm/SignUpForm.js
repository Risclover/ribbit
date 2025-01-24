import React from "react";
import { AuthFormInput, FormHeader, SignInSwitch } from "../../components";
import { AuthModalLayout } from "../../components";
import { useSignUpForm } from "../../hooks";
import { handleEmailErrors } from "../../utils";
import { useAuthFlow } from "context/AuthFlowContext";

/**
 * The sign-up form
 *
 * - formType: The type of form it is; controls the topmost form button ('close', 'back', or 'go home')
 */

export const SignUpForm = ({ formType }) => {
  const { emailInputProps, emailTaken, continueBtn } = useSignUpForm();
  const { signupFormData, view, openSignupPage2, closeModal } = useAuthFlow();

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
          <FormHeader />
          <AuthFormInput
            props={emailInputProps}
            testId="Email"
            onBlur={() => handleEmailErrors(signupFormData.email, emailTaken)}
          />
          <SignInSwitch prompt="Already a ribbitor? " linkText="Log In" />
        </div>
      </div>
    </AuthModalLayout>
  );
};
