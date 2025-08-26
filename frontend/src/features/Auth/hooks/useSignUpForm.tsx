import React, { useState } from "react";
import { useAppSelector } from "@/store";
import { useAuthFlow } from "@/context";
import { handleEmailErrors } from "../utils";

/**
 * Logic for SignUpForm (first page)
 * - State variables (field errors, blurred and focused states, disabled state)
 * - Field setter for email field
 * - Validation logic for email field
 * - Input props for email field
 * - Form submission handler ("Continue" button)
 */
export function useSignUpForm() {
  const users = useAppSelector((state) => state.users.users);

  const { signupFormData, setSignupFormData, openSignupPage2 } = useAuthFlow();

  const [emailErrors, setEmailErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [focused, setFocused] = useState(false);

  const emailTaken = Object.values(users).find(
    (user) => user.email.toLowerCase() === signupFormData.email.toLowerCase()
  );

  // ========== FIELD SETTERS ==========
  const setEmail = (val) => {
    setSignupFormData((prev) => ({ ...prev, email: val }));
  };

  // ========== VALIDATION ON BLUR ==========
  const handleEmailBlur = () => {
    setEmailBlurred(true);
    const errors = handleEmailErrors(signupFormData.email, emailTaken);
    setEmailErrors(errors);
    const finalDisabled = signupFormData.email === "" || errors.length > 0;
    setDisabled(finalDisabled);
  };

  // ========== BUILD INPUT PROPS ==========
  const emailInputProps = {
    type: "email",
    name: "signup-email",
    inputValue: signupFormData.email,
    errors: emailErrors,
    setErrors: setEmailErrors,
    setBlurred: setEmailBlurred,
    onBlur: handleEmailBlur,
    label: "Email",
    maxLength: 255,
    autoCompleteStatus: "off",
    testId: "Email",
    setInputValue: setEmail,
    focused,
    setFocused,
  };

  // ========== SUBMISSION ==========
  const continueBtn = (
    <button className=" signup-form-submit" disabled={disabled} type="submit">
      Continue
    </button>
  );
  const continueToSecondPage = (e) => {
    e.preventDefault();
    openSignupPage2();
  };

  return {
    emailInputProps,
    emailTaken,
    disabled,
    continueToSecondPage,
    continueBtn,
    emailBlurred,
  };
}
