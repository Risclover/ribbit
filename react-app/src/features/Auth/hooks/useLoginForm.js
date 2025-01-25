import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthFlow } from "@/context";
import { login, getUsers } from "@/store";
import { handleErrors } from "../utils";

export function useLoginForm() {
  const dispatch = useDispatch();

  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [focused, setFocused] = useState(false);

  const { loginFormData, setLoginFormData, closeModal } = useAuthFlow();

  const setLoginEmail = (val) => {
    setLoginFormData((prev) => ({ ...prev, email: val }));
  };

  const setLoginPassword = (val) => {
    setLoginFormData((prev) => ({ ...prev, password: val }));
  };

  const handleEmailBlur = () => {
    setEmailBlurred(true);

    const errors = handleErrors(loginFormData.email);
    setLoginEmailErrors(errors);

    const pErrors = handleErrors(loginFormData.password);
    setLoginPasswordErrors(pErrors);
  };

  const handlePasswordBlur = () => {
    setPasswordBlurred(true);

    const errors = handleErrors(loginFormData.password);
    setLoginPasswordErrors(errors);

    const eErrors = handleErrors(loginFormData.email);
    setLoginEmailErrors(eErrors);
  };

  useEffect(() => {
    const finalDisabled =
      loginFormData.email === "" ||
      loginEmailErrors.length > 0 ||
      loginFormData.password === "" ||
      loginPasswordErrors.length > 0;
    setDisabled(finalDisabled);
  }, [loginFormData, loginEmailErrors, loginPasswordErrors]);

  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    setInputValue: setValue,
    errors,
    onBlur: name === "email" ? handleEmailBlur : handlePasswordBlur,
    setBlurred: name === "email" ? setEmailBlurred : setPasswordBlurred,
    setErrors: name === "email" ? setLoginEmailErrors : setLoginPasswordErrors,
    maxLength: 255,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    autoCompleteStatus: name === "password" ? "new-password" : "off",
    testId: name.charAt(0).toUpperCase() + name.slice(1),
    focused,
    setFocused: setFocused,
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      login(loginFormData.email.toLowerCase(), loginFormData.password)
    );
    if (data && data.length > 0) {
      let errors = [];
      errors.push("Incorrect email or password");
      setLoginEmailErrors([""]);
      setLoginPasswordErrors(errors);
    } else {
      closeModal();
    }
    await dispatch(getUsers());
  };

  const submitBtn = (
    <button className="login-form-submit" disabled={disabled} type="submit">
      {" "}
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
