import React from "react";
import { AuthModal } from "@/context";
import { AuthFormInput, FormHeader, SignInSwitch } from "../../components";
import { useSignUpForm } from "../../hooks";
import { handleEmailErrors } from "../../utils";

export const SignUpForm = ({
  email,
  setEmail,
  setShowSignupForm,
  setShowLoginForm,
  formType,
  setOpenSecondPage,
  openSecondPage,
  switchAuthForms,
  showSignupForm,
}) => {
  const { emailInputProps, emailTaken, continueToSecondPage, continueBtn } =
    useSignUpForm({
      setEmail,
      email,
      setOpenSecondPage,
      setShowLoginForm,
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
      active={showSignupForm}
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
            switchAuthForms={switchAuthForms}
          />
        </div>
      </div>
    </AuthModal>
  );
};
