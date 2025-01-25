import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthFlow } from "@/context";
import { login, getUsers } from "@/store";
import { handleErrors } from "../utils";

export function useLoginForm() {
  const dispatch = useDispatch();

  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [focused, setFocused] = useState(false);

  const { loginFormData, setLoginFormData, closeModal } = useAuthFlow();

  const setLoginEmail = (val) => {
    setLoginFormData((prev) => ({ ...prev, email: val }));
  };

  const setLoginPassword = (val) => {
    setLoginFormData((prev) => ({ ...prev, password: val }));
  };

  const inputProps = (name, value, setValue, errors) => ({
    type: name,
    name,
    inputValue: value,
    setInputValue: setValue,
    errors,
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
    <button
      className="login-form-submit"
      disabled={disabled}
      type="submit"
      onClick={handleLogin}
    >
      {" "}
      Log In
    </button>
  );

  useEffect(() => {
    const emailErrors = handleErrors(loginFormData.email);
    const passwordErrors = handleErrors(loginFormData.password);

    setDisabled(
      loginFormData.email === "" ||
        emailErrors.length > 0 ||
        loginFormData.password === "" ||
        passwordErrors.length > 0
    );
  }, [
    loginFormData.email,
    setLoginEmailErrors,
    loginFormData.password,
    setLoginPasswordErrors,
    setDisabled,
  ]);

  return {
    setLoginEmail,
    setLoginPassword,
    handleLogin,
    emailInputProps,
    passwordInputProps,
    submitBtn,
  };
}
