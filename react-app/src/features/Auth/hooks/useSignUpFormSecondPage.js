import React, { useEffect, useState } from "react";
import { useUsernameTaken } from "./useUsernameTaken.hook";
import { validatePassword, validateUsername } from "../utils";

export default function useSignUpFormSecondPage({
  setDisabled,
  username,
  password,
  setUsername,
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

  const usernameInputProps = inputProps(
    "username",
    username,
    setUsername,
    usernameErrors
  );

  const passwordInputProps = inputProps(
    "password",
    password,
    setPassword,
    passwordErrors
  );

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

  return {
    usernameErrors,
    passwordErrors,
    usernameTaken,
    usernameInputProps,
    passwordInputProps,
  };
}
