import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuthFlow } from "@/context";
import { signUp, getUsers } from "@/store";
import { useUsernameTaken } from "../hooks";
import { validatePassword, validateUsername, generateUsername } from "../utils";

/**
 * Single source of truth for:
 *   - username, password
 *   - field-level errors
 *   - whether the user blurred the field
 *   - sign-up submission
 *
 * Validations happen on blur + on "rotate."
 * "Nice! Username available" only shows if user has blurred the field
 *   (or we forcibly blur on rotate).
 */
export function useSignUpFormSecondPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector((state) => state.users);

  const { signupFormData, setSignupFormData, openSignupPage1, closeModal } =
    useAuthFlow();

  // Errors stored here
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  // Track if username is taken
  const [taken, setTaken] = useState(false);

  // Instead of focusing logic, track "has the user blurred?"
  const [usernameBlurred, setUsernameBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  // For disabling submit
  const [disabled, setDisabled] = useState(true);

  // Check if username is taken
  const usernameTaken = useUsernameTaken(signupFormData.username);

  useEffect(() => {
    setTaken(usernameTaken);
  }, [usernameTaken]);

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

  // ========== "ROTATE" USERNAME ==========

  // If user clicks the rotate button
  const onRotateUsername = () => {
    const newName = generateUsername();

    // set the parent's username
    setSignupFormData((prev) => ({ ...prev, username: newName }));

    // validate now
    const errors = validateUsername(newName, false);
    setUsernameErrors(errors);
    setTaken(false);

    // also check password again for disabling
    const pErrors = validatePassword(signupFormData.password);
    setPasswordErrors(pErrors);

    const finalDisabled =
      errors.length > 0 ||
      newName === "" ||
      pErrors.length > 0 ||
      signupFormData.password === "";
    setDisabled(finalDisabled);

    // Force "blurred" so that "Nice! Username available" can appear immediately
    // since it's determined in the backend whether the username is taken
    setUsernameBlurred(true);
  };

  // ========== BUILD INPUT PROPS ==========

  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    errors,
    setErrors: name === "username" ? setUsernameErrors : setPasswordErrors,
    setInputValue: setValue,
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
