import React from "react";
import { AuthFormInput } from "../AuthFormInput";
import { FormHeader } from "../FormHeader";
import SignInSwitch from "../SignInSwitch";
import useSignUpForm from "features/Auth/hooks/useSignUpForm";
import { AuthModal } from "context";
import { handleEmailErrors } from "../../utils/signupFormValidation";
import "../../styles/AuthModal.css";

export const SignUpForm = ({
  email,
  setEmail,
  setShowSignupForm,
  setShowLoginForm,
  formType,
  setOpenSecondPage,
  openSecondPage,
}) => {
  const { emailInputProps, emailTaken, continueToSecondPage, continueBtn } =
    useSignUpForm({
      setEmail,
      email,
      setOpenSecondPage,
      setShowSignupForm,
    });

  return (
    <AuthModal
      topbarBtn={formType === "protected" ? "none" : "close"}
      title="Sign Up"
      onClose={() => setShowSignupForm(false)}
      setOpenSecondPage={setOpenSecondPage}
      openSecondPage={openSecondPage}
      footerBtn={continueBtn}
      onSubmit={continueToSecondPage}
    >
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
    </AuthModal>
  );
};
