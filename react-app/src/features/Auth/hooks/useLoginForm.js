import { useState, useEffect } from "react";
import { handleErrors } from "../utils/loginFormValidation";
import { useDispatch } from "react-redux";
import { login } from "store";

export function useLoginForm() {
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [focused, setFocused] = useState(false);

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
    focused: focused,
    setFocused: setFocused,
  });

  const emailInputProps = inputProps(
    "email",
    loginEmail,
    setLoginEmail,
    loginEmailErrors
  );

  const passwordInputProps = inputProps(
    "password",
    loginPassword,
    setLoginPassword,
    loginPasswordErrors
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(loginEmail.toLowerCase(), loginPassword));
    if (data && data.length > 0) {
      let errors = [];
      errors.push("Incorrect email or password");
      setLoginEmailErrors([""]);
      setLoginPasswordErrors(errors);
    }
  };

  const submitBtn = (
    <button className="login-form-submit" disabled={disabled} type="submit">
      {" "}
      Log In
    </button>
  );

  useEffect(() => {
    const emailErrors = handleErrors(loginEmail);
    const passwordErrors = handleErrors(loginPassword);

    setDisabled(
      loginEmail === "" ||
        emailErrors.length > 0 ||
        loginPassword === "" ||
        passwordErrors.length > 0
    );
  }, [
    loginEmail,
    setLoginEmailErrors,
    loginPassword,
    setLoginPasswordErrors,
    setDisabled,
  ]);

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    emailInputProps,
    passwordInputProps,
    submitBtn,
  };
}
