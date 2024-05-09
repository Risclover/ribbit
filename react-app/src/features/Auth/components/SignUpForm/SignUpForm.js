import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/store";
import { AuthFormInput } from "../AuthFormInput";
import { FormHeader } from "../FormHeader";
import { handleEmailErrors } from "../../utils/signupFormValidation";
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

  const emailTaken = Object.values(users).find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const emailInputProps = {
    type: "email",
    name: "signup-email",
    inputValue: email,
    errors: emailErrors,
    setErrors: setEmailErrors,
    label: "Email",
    maxLength: 255,
    autoCompleteStatus: "off",
    testId: "Email",
    setInputValue: setEmail,
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
