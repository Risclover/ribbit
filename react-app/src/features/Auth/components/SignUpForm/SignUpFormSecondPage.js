import React from "react";
import { AuthFormInput } from "../AuthFormInput";
import {
  validatePassword,
  validateUsername,
} from "../../utils/signupFormValidation";
import useSignUpFormSecondPage from "features/Auth/hooks/useSignUpFormSecondPage";

export function SignUpFormSecondPage({
  setDisabled,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const { inputProps, usernameErrors, passwordErrors, usernameTaken } =
    useSignUpFormSecondPage({ setDisabled, username, password });

  return (
    <div>
      <p className="auth-modal-agreement">
        Ribbit is anonymous, so your username is what you’ll go by here. Choose
        wisely—because once you get a name, you can’t change it.
      </p>
      <form>
        <AuthFormInput
          props={inputProps("username", username, setUsername, usernameErrors)}
          onChange={setUsername}
          onBlur={() => validateUsername(username, usernameTaken)}
          icon="rotate"
        />
        <AuthFormInput
          props={inputProps("password", password, setPassword, passwordErrors)}
          onChange={setPassword}
          onBlur={() => validatePassword(password)}
        />
      </form>
    </div>
  );
}
