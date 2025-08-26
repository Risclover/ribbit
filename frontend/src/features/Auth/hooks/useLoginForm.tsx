import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { useAuthFlow } from "@/context";
import { login, getUsers } from "@/store";
import { handleErrors } from "../utils";

/**
 * Logic for LoginForm
 * - State variables (field errors, blurred states, disabled states)
 * - Field setters for email and password fields
 * - Validation logic for email and password fields
 * - Input props for email and password fields
 * - Form submission handler
 */
export function useLoginForm() {
  const dispatch = useAppDispatch();

  const { loginFormData, setLoginFormData, closeModal } = useAuthFlow();

  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);

  // Tracks "Has the user blurred?", for behavior for errors, icons, and styles
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  // For disabling submit button
  const [disabled, setDisabled] = useState(true);

  // ========== FIELD SETTERS ==========
  const setLoginEmail = (val) => {
    setLoginFormData((prev) => ({ ...prev, email: val }));
  };
  const setLoginPassword = (val) => {
    setLoginFormData((prev) => ({ ...prev, password: val }));
  };

  // ========== VALIDATIONS ON BLUR ==========
  const handleEmailBlur = () => {
    setEmailBlurred(true);
    const errors = handleErrors(loginFormData.email);
    setLoginEmailErrors(errors);
    const passwordErrors = handleErrors(loginFormData.password);
    setLoginPasswordErrors(passwordErrors);
  };
  const handlePasswordBlur = () => {
    setPasswordBlurred(true);
    const errors = handleErrors(loginFormData.password);
    setLoginPasswordErrors(errors);
    const emailErrors = handleErrors(loginFormData.email);
    setLoginEmailErrors(emailErrors);
  };

  // For disabling submit button under appropriate circumstances
  useEffect(() => {
    const finalDisabled =
      loginFormData.email === "" ||
      loginEmailErrors.length > 0 ||
      loginFormData.password === "" ||
      loginPasswordErrors.length > 0;
    setDisabled(finalDisabled);
  }, [loginFormData, loginEmailErrors, loginPasswordErrors]);

  // ========== BUILD INPUT PROPS ==========
  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    setInputValue: setValue,
    errors,
    setErrors: name === "email" ? setLoginEmailErrors : setLoginPasswordErrors,
    onBlur: name === "email" ? handleEmailBlur : handlePasswordBlur,
    setBlurred: name === "email" ? setEmailBlurred : setPasswordBlurred,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    maxLength: 255,
    autoCompleteStatus: name === "password" ? "new-password" : "off",
    testId: name.charAt(0).toUpperCase() + name.slice(1),
  });

  const emailInputProps = inputProps(
    "email",
    loginFormData.email,
    setLoginEmail,
    loginEmailErrors
  );
  const passwordInputProps = inputProps(
    "password",
    loginFormData.password,
    setLoginPassword,
    loginPasswordErrors
  );

  // ========== SUBMISSION ==========
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      login(loginFormData.email.toLowerCase(), loginFormData.password)
    );
    if (data && data.length > 0) {
      const errors = [];
      errors.push("Incorrect email or password");
      setLoginEmailErrors([""]);
      setLoginPasswordErrors(errors);
      document.getElementById("email").focus();
      setEmailBlurred(false);
    } else {
      closeModal();
    }
    await dispatch(getUsers());
  };

  const submitBtn = (
    <button className="login-form-submit" disabled={disabled} type="submit">
      Log In
    </button>
  );

  return {
    setLoginEmail,
    setLoginPassword,
    emailBlurred,
    passwordBlurred,
    handleLogin,
    emailInputProps,
    passwordInputProps,
    submitBtn,
  };
}
