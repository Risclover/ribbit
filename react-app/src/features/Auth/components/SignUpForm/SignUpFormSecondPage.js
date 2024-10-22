import React, { useState } from "react";
import { AuthFormInput } from "../AuthFormInput";
import {
  validatePassword,
  validateUsername,
} from "../../utils/signupFormValidation";
import useSignUpFormSecondPage from "features/Auth/hooks/useSignUpFormSecondPage";
import { AuthModal } from "context";

export function SignUpFormSecondPage({
  // username,
  // setUsername,
  // password,
  // setPassword,
  formType,
  setOpenSecondPage,
  setShowSignupForm,
}) {
  const [disabled, setDisabled] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { usernameTaken, usernameInputProps, passwordInputProps } =
    useSignUpFormSecondPage({
      setDisabled,
      username,
      password,
      setUsername,
      setPassword,
    });

  return (
    <AuthModal
      title="Create your username and password"
      onClose={() => {
        setOpenSecondPage(false);
        setShowSignupForm(true);
      }}
      topbarBtn={formType === "protected" ? "none" : "back"}
      footerBtn={
        <button
          className="signup-form-submit"
          disabled={disabled}
          type="submit"
        >
          Sign Up
        </button>
      }
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
