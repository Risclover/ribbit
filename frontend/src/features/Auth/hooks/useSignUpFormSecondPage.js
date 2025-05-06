import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { signUp, getUsers } from "@/store";
import { useUsernameTaken } from ".";
import { validatePassword, validateUsername, generateUsername } from "../utils";

/**
 * Custom hook for sign up form's second page.
 * - Logic for page's input boxes (username and password)
 * - Logic for page's submit button
 */
export function useSignUpFormSecondPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector((state) => state.users);

  const { signupFormData, setSignupFormData, openSignupPage1, closeModal } =
    useAuthFlow();
  const usernameTaken = useUsernameTaken(signupFormData.username);

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [taken, setTaken] = useState(false); // Flag to track if username is taken

  // Tracks "Has the user blurred?", for behavior for errors, icons, and styles
  const [usernameBlurred, setUsernameBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  // For disabling submit button
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setTaken(usernameTaken);
  }, [usernameTaken]);

  // If the username input box is focused, show no errors.
  useEffect(() => {
    if (!usernameBlurred) {
      setUsernameErrors([]);
    }
  }, [usernameBlurred]);

  // ========== FIELD SETTERS ==========

  const setUsername = (val) => {
    setSignupFormData((prev) => ({ ...prev, username: val }));
  };

  const setPassword = (val) => {
    setSignupFormData((prev) => ({ ...prev, password: val }));
  };

  // ========== VALIDATION ON BLUR ==========

  // Called when user leaves the username field
  const handleUsernameBlur = () => {
    // Mark that the user has blurred
    setUsernameBlurred(true);

    // Validate now
    const errors = validateUsername(signupFormData.username, taken);
    setUsernameErrors(errors);

    // also check password if we want to update disabled
    const pErrors = validatePassword(signupFormData.password);
    setPasswordErrors(pErrors);

    const finalDisabled =
      errors.length > 0 ||
      signupFormData.username === "" ||
      pErrors.length > 0 ||
      signupFormData.password === "";
    setDisabled(finalDisabled);
  };

  // Called when user leaves the password field
  const handlePasswordBlur = () => {
    setPasswordBlurred(true);

    const pErrors = validatePassword(signupFormData.password);
    setPasswordErrors(pErrors);

    const uErrors = validateUsername(signupFormData.username, taken);
    setUsernameErrors(uErrors);

    const finalDisabled =
      pErrors.length > 0 ||
      signupFormData.password === "" ||
      uErrors.length > 0 ||
      signupFormData.username === "";
    setDisabled(finalDisabled);
  };

  // ========== GENERATE RANDOM USERNAME ==========

  // If user clicks the "rotate" button
  const onRotateUsername = () => {
    const newName = generateUsername();

    // Set the username
    setSignupFormData((prev) => ({ ...prev, username: newName }));

    // Validate username
    const errors = validateUsername(newName, false);
    setUsernameErrors(errors);
    setTaken(false); // Automatically set to false because backend handles logic for determining whether a username is taken BEFORE suggesting it to user

    // Check password again for disabling
    const pErrors = validatePassword(signupFormData.password);
    setPasswordErrors(pErrors);

    const finalDisabled =
      errors.length > 0 ||
      newName === "" ||
      pErrors.length > 0 ||
      signupFormData.password === "";
    setDisabled(finalDisabled);

    // Force "blurred" so that "Nice! Username available" can appear immediately
    setUsernameBlurred(true);
  };

  // ========== BUILD INPUT PROPS ==========
  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    setInputValue: setValue,
    errors,
    setErrors: name === "username" ? setUsernameErrors : setPasswordErrors,
    onBlur: name === "username" ? handleUsernameBlur : handlePasswordBlur,
    setBlurred: name === "username" ? setUsernameBlurred : setPasswordBlurred,
    onRotate: name === "username" ? onRotateUsername : undefined,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    maxLength: name === "username" ? 20 : 255,
    autoCompleteStatus: name === "password" ? "new-password" : "off",
    testId: name.charAt(0).toUpperCase() + name.slice(1),
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

  // ========== SUBMISSION ==========

  const handleSignUp = (e) => {
    e.preventDefault();

    if (disabled) return;

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
    <button className="signup-form-submit" disabled={disabled} type="submit">
      Sign Up
    </button>
  );

  return {
    usernameInputProps,
    passwordInputProps,
    usernameErrors,
    passwordErrors,
    taken,
    setTaken,
    usernameBlurred,
    passwordBlurred,
    disabled,
    handleSignUp,
    submitBtn,
    returnToFirstPage,
  };
}
