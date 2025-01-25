import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthFlow } from "@/context";
import { getUsers } from "@/store";
import { handleEmailErrors } from "../utils";

export function useSignUpForm() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const { signupFormData, setSignupFormData, openSignupPage2 } = useAuthFlow();

  const [emailErrors, setEmailErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [focused, setFocused] = useState(false);

  const emailTaken = Object.values(users).find(
    (user) => user.email.toLowerCase() === signupFormData.email.toLowerCase()
  );

  useEffect(() => {
    const errors = handleEmailErrors(signupFormData.email, emailTaken);
    setDisabled(signupFormData.email === "" || errors.length > 0);
  }, [signupFormData.email, setDisabled, setEmailErrors]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const setEmail = (val) => {
    setSignupFormData((prev) => ({ ...prev, email: val }));
  };

  const emailInputProps = {
    type: "email",
    name: "signup-email",
    inputValue: signupFormData.email,
    errors: emailErrors,
    setErrors: setEmailErrors,
    label: "Email",
    maxLength: 255,
    autoCompleteStatus: "off",
    testId: "Email",
    setInputValue: setEmail,
    focused,
    setFocused,
  };

  const continueBtn = (
    <button
      className=" signup-form-submit"
      disabled={disabled}
      type="submit"
      onClick={openSignupPage2}
    >
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
  };
}
