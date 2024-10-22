// hooks/useAuthFormInput.js
import { useState, useEffect } from "react";
import { handleErrors } from "../utils/loginFormValidation";
import { generateUsername } from "../utils/generateUsername";

export function useAuthFormInput(initialValue, name, validateFn) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [classValue, setClassValue] = useState("");

  useEffect(() => {
    setErrors(validateFn(inputValue));
    setClassValue(errors && errors.length > 0 ? "errors-true" : "");
  }, [inputValue, errors, validateFn]);

  useEffect(() => {
    setShowIcon(inputValue.length > 0 && errors.length === 0 && !focused);
  }, [inputValue, errors, focused]);

  const pickRandomUsername = () => {
    setInputValue(generateUsername());
    setErrors([]);
  };

  const handleBlur = () => {
    setFocused(false);
    const validationErrors = validateFn(inputValue);
    setErrors(validationErrors);
    setClassValue(validationErrors.length > 0 ? "errors-true" : "");
    return validationErrors;
  };

  const handleFocus = () => {
    setClassValue("");
    setFocused(true);
  };

  return {
    inputValue,
    setInputValue,
    errors,
    setErrors,
    focused,
    setFocused,
    showIcon,
    classValue,
    pickRandomUsername,
    handleBlur,
    handleFocus,
  };
}
