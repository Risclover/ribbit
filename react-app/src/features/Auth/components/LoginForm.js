import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../store";
import { AuthFormInput } from "./AuthFormInput";
import { handleErrors } from "../utils/loginFormValidation";
import { FormHeader } from "./FormHeader";
import "../styles/AuthModal.css";

export const LoginForm = ({
  setShowLoginForm,
  setShowSignupForm,
  setDisabled,
  loginEmail,
  loginPassword,
  setLoginEmail,
  setLoginPassword,
  loginEmailErrors,
  setLoginEmailErrors,
  loginPasswordErrors,
  setLoginPasswordErrors,
  focused,
  setFocused,
}) => {
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

  return (
    <>
      <div className="login-form-container">
        <div className="login-form">
          <FormHeader
            setShowSignupForm={setShowSignupForm}
            setShowLoginForm={setShowLoginForm}
          />
          <AuthFormInput
            props={inputProps(
              "email",
              loginEmail,
              setLoginEmail,
              loginEmailErrors
            )}
            onChange={setLoginEmail}
            onBlur={() => handleErrors(loginEmail)}
          />
          <AuthFormInput
            props={inputProps(
              "password",
              loginPassword,
              setLoginPassword,
              loginPasswordErrors
            )}
            onChange={setLoginPassword}
            onBlur={() => handleErrors(loginPassword)}
          />
          <p className="sign-in-switch">
            New to Ribbit?{" "}
            <span
              onClick={() => {
                setShowLoginForm(false);
                setShowSignupForm(true);
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
