import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkEmail, getUsers, signUp } from "../../../../store";
import { AuthFormInput } from "../AuthFormInput";
import DemoAccountWarning from "../../components/DemoAccountWarning/DemoAccountWarning";
import { AuthModal } from "../../../../context/AuthModal";
import { handleEmailErrors } from "../../utils/signupFormValidation";
import { FormHeader } from "../FormHeader";
import "../../styles/AuthModal.css";

export const SignUpForm = ({
  email,
  setEmail,
  setShowSignupForm,
  setShowLoginForm,
  setDisabled,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [emailErrors, setEmailErrors] = useState([]);

  const emailTaken = Object.values(users).find((user) => user.email === email);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const emailInputProps = {
    type: "email",
    name: "signup-email",
    inputValue: email,
    errors: emailErrors,
    setErrors: setEmailErrors,
    label: "Email ",
    maxLength: 255,
    autoCompleteStatus: "off",
    testId: "Email",
  };

  useEffect(() => {
    const errors = handleEmailErrors(email, emailTaken);
    setDisabled(email === "" || errors.length > 0);
  }, [email, setDisabled, setEmailErrors]);

  return (
    <>
      <div className="signup-form-container">
        <div className="signup-form">
          <FormHeader
            setShowSignupForm={setShowSignupForm}
            setShowLoginForm={setShowLoginForm}
          />
          <AuthFormInput
            props={emailInputProps}
            onChange={setEmail}
            testId="Email"
            onBlur={() => handleEmailErrors(email, emailTaken)}
          />

          <p className="sign-in-switch">
            Already a ribbitor?{" "}
            <span
              onClick={() => {
                setShowLoginForm(true);
                setShowSignupForm(false);
              }}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
