import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleEmailErrors } from "../utils";
import { getUsers } from "@/store";

export default function useSignUpForm({
  setEmail,
  email,
  setOpenSecondPage,
  setShowSignupForm,
}) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [emailErrors, setEmailErrors] = useState([]);
  const [disabled, setDisabled] = useState();

  const emailTaken = Object.values(users).find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  useEffect(() => {
    const errors = handleEmailErrors(email, emailTaken);
    setDisabled(email === "" || errors.length > 0);
  }, [email, setDisabled, setEmailErrors]);

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

  const continueBtn = (
    <button className=" signup-form-submit" disabled={disabled} type="submit">
      Continue
    </button>
  );

  const continueToSecondPage = (e) => {
    e.preventDefault();
    setOpenSecondPage(true);
    setShowSignupForm(false);
  };

  return {
    emailInputProps,
    emailTaken,
    disabled,
    continueToSecondPage,
    continueBtn,
  };
}
