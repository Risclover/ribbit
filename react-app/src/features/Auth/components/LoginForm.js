import React, { useEffect, useState } from "react";
import { AuthFormInput } from "./AuthFormInput";
import { handleErrors } from "../utils/loginFormValidation";
import { FormHeader } from "./FormHeader";
import "../styles/AuthModal.css";
import SignInSwitch from "./SignInSwitch";
import { AuthModal } from "context";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "store";

export const LoginForm = ({
  setShowLoginForm,
  setShowSignupForm,
  // setDisabled,
  // loginEmail,
  // loginPassword,
  // setLoginEmail,
  // setLoginPassword,
  // loginEmailErrors,
  // setLoginEmailErrors,
  // loginPasswordErrors,
  // setLoginPasswordErrors,
  focused,
  setFocused,
  formType,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailErrors, setLoginEmailErrors] = useState([]);
  const [loginPasswordErrors, setLoginPasswordErrors] = useState([]);
  const [disabled, setDisabled] = useState();

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

  return (
    <AuthModal
      title="Log In"
      onClose={() => setShowLoginForm(false)}
      topbarBtn={formType === "protected" ? "none" : "close"}
      footerBtn={
        <button className="login-form-submit" disabled={disabled} type="submit">
          {" "}
          Log In
        </button>
      }
      onSubmit={(e) => handleLogin(e)}
    >
      <div className="login-form-container">
        <div className="login-form">
          <FormHeader
            setShowSignupForm={setShowSignupForm}
            setShowLoginForm={setShowLoginForm}
          />
          <AuthFormInput
            props={emailInputProps}
            onChange={setLoginEmail}
            onBlur={() => handleErrors(loginEmail)}
          />
          <AuthFormInput
            props={passwordInputProps}
            onChange={setLoginPassword}
            onBlur={() => handleErrors(loginPassword)}
          />
          <SignInSwitch
            prompt="New to Ribbit? "
            onClick={() => {
              setShowLoginForm(false);
              setShowSignupForm(true);
            }}
            linkText="Sign Up"
          />
        </div>
      </div>
    </AuthModal>
  );
};
