import React from "react";
import { AuthFormInput } from "../AuthFormInput";
import {
  validatePassword,
  validateUsername,
} from "../../utils/signupFormValidation";
import useSignUpFormSecondPage from "features/Auth/hooks/useSignUpFormSecondPage";
import { AuthModal } from "context";

export function SignUpFormSecondPage({
  formType,
  setOpenSecondPage,
  setShowSignupForm,
  email,
}) {
  const {
    username,
    password,
    setUsername,
    setPassword,
    usernameTaken,
    usernameInputProps,
    passwordInputProps,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  } = useSignUpFormSecondPage({
    setShowSignupForm,
    setOpenSecondPage,
    email,
  });

  return (
    <AuthModal
      title="Create your username and password"
      onClose={returnToFirstPage}
      topbarBtn={formType === "protected" ? "none" : "back"}
      footerBtn={submitBtn}
      onSubmit={(e) => handleSignUp(e)}
    >
      <div>
        <p className="auth-modal-agreement">
          Ribbit is anonymous, so your username is what you’ll go by here.
          Choose wisely—because once you get a name, you can’t change it.
        </p>
        <form>
          <AuthFormInput
            props={usernameInputProps}
            onChange={setUsername}
            onBlur={() => validateUsername(username, usernameTaken)}
            icon="rotate"
          />
          <AuthFormInput
            props={passwordInputProps}
            onChange={setPassword}
            onBlur={() => validatePassword(password)}
          />
        </form>
      </div>
    </AuthModal>
  );
}
