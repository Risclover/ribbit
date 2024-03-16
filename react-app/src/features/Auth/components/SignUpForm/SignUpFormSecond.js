import React, { useEffect, useState } from "react";
import { AuthFormInput } from "../AuthFormInput";
import {
  validatePassword,
  validateUsername,
} from "../../utils/signupFormValidation";
import { useUsernameTaken } from "../../hooks/useUsernameTaken";

export function SignUpFormSecond({
  setDisabled,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const usernameTaken = useUsernameTaken(username);

  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    setInputValue: setValue,
    errors,
    setErrors: name === "username" ? setUsernameErrors : setPasswordErrors,
    maxLength: name === "username" ? 20 : 255,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    autoCompleteStatus: name === "password" ? "new-password" : "off",
    testId: name.charAt(0).toUpperCase() + name.slice(1),
  });

  useEffect(() => {
    const usernameErrors = validateUsername(username, usernameTaken);
    const passwordErrors = validatePassword(password);
    setDisabled(
      username === "" ||
        usernameErrors.length > 0 ||
        password === "" ||
        passwordErrors.length > 0
    );
  }, [
    username,
    setDisabled,
    setUsernameErrors,
    password,
    setPasswordErrors,
    usernameTaken,
  ]);

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
