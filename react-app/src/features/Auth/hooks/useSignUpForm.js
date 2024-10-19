import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleEmailErrors } from "../utils";
import { getUsers } from "@/store";

export default function useSignUpForm({ setDisabled, setEmail, email }) {
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

  return { emailInputProps, emailTaken };
}
