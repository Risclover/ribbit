import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { signUp, getUsers } from "@/store";
import { useUsernameTaken } from "../hooks";
import { validatePassword, validateUsername } from "../utils";

export function useSignUpFormSecondPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState();
  const [focused, setFocused] = useState(false);
  const [taken, setTaken] = useState(false);

  const {
    signupFormData,
    setSignupFormData,
    openLogin,
    openSignupPage1,
    openSignupPage2,
    closeModal,
  } = useAuthFlow();

  let usernameTaken = useUsernameTaken(signupFormData.username);

  useEffect(() => {
    setTaken(usernameTaken);
  }, [usernameTaken]);

  const allUsers = useSelector((state) => state.users);

  const setUsername = (val) => {
    setSignupFormData((prev) => ({ ...prev, username: val }));
  };

  const setPassword = (val) => {
    setSignupFormData((prev) => ({ ...prev, password: val }));
  };

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
    focused,
    setFocused,
  });

  const usernameInputProps = inputProps(
    "username",
    signupFormData.username,
    setUsername,
    usernameErrors
  );

  const passwordInputProps = inputProps(
    "password",
    signupFormData.password,
    setPassword,
    passwordErrors
  );

  useEffect(() => {
    const usernameErrors = validateUsername(
      signupFormData.username,
      usernameTaken
    );
    const passwordErrors = validatePassword(signupFormData.password);

    setDisabled(
      signupFormData.username === "" ||
        usernameErrors.length > 0 ||
        signupFormData.password === "" ||
        passwordErrors.length > 0
    );
  }, [
    signupFormData.username,
    setDisabled,
    setUsernameErrors,
    signupFormData.password,
    setPasswordErrors,
    usernameTaken,
  ]);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(
      signUp(
        signupFormData.username,
        signupFormData.email.toLowerCase(),
        signupFormData.password
      )
    );
    closeModal();
    const id = Object.values(allUsers).length + 1;
    history.push(`/users/${id}/profile`);
    dispatch(getUsers());
  };

  const returnToFirstPage = () => {
    openSignupPage1();
  };

  const submitBtn = (
    <button
      className="signup-form-submit"
      disabled={disabled}
      type="submit"
      onClick={handleSignUp}
    >
      Sign Up
    </button>
  );

  return {
    setUsername,
    setPassword,
    usernameErrors,
    passwordErrors,
    taken,
    setTaken,
    usernameInputProps,
    passwordInputProps,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  };
}
