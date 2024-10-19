import React from "react";
import { AuthFormInput } from "../AuthFormInput";
import { FormHeader } from "../FormHeader";
import { handleEmailErrors } from "../../utils/signupFormValidation";
import SignInSwitch from "../SignInSwitch";
import useSignUpForm from "features/Auth/hooks/useSignUpForm";
import "../../styles/AuthModal.css";

export const SignUpForm = ({
  email,
  setEmail,
  setShowSignupForm,
  setShowLoginForm,
  setDisabled,
}) => {
  const { emailInputProps, emailTaken } = useSignUpForm({
    setDisabled,
    setEmail,
    email,
  });

  return (
    <div className="signup-form-container">
      <div className="signup-form">
        <FormHeader
          setShowSignupForm={setShowSignupForm}
          setShowLoginForm={setShowLoginForm}
        />
        <AuthFormInput
          props={emailInputProps}
          testId="Email"
          onBlur={() => handleEmailErrors(email, emailTaken)}
        />
        <SignInSwitch
          prompt="Already a ribbitor? "
          linkText="Log In"
          onClick={() => {
            setShowLoginForm(true);
            setShowSignupForm(false);
          }}
        />
      </div>
    </div>
  );
};
