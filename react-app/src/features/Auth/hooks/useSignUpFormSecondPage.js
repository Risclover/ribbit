import React, { useEffect, useState } from "react";
import { useUsernameTaken } from "./useUsernameTaken.hook";
import { validatePassword, validateUsername } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "store";

export default function useSignUpFormSecondPage({
  setShowSignupForm,
  setOpenSecondPage,
  email,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState();

  const usernameTaken = useUsernameTaken(username);
  const allUsers = useSelector((state) => state.users);

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

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp(username, email.toLowerCase(), password));
    setShowSignupForm(false);
    const id = Object.values(allUsers).length + 1;
    history.push(`/users/${id}/profile`);
  };

  const returnToFirstPage = () => {
    setOpenSecondPage(false);
    setShowSignupForm(true);
  };

  const submitBtn = (
    <button className="signup-form-submit" disabled={disabled} type="submit">
      Sign Up
    </button>
  );

  return {
    username,
    password,
    setUsername,
    setPassword,
    usernameErrors,
    passwordErrors,
    usernameTaken,
    usernameInputProps,
    passwordInputProps,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  };
}
