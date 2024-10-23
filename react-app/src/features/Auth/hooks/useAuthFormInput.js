// hooks/useAuthFormInput.js
import { useState, useEffect } from "react";
import { handleErrors } from "../utils/loginFormValidation";
import { generateUsername } from "../utils/generateUsername";

export function useAuthFormInput(validateFn, inputProps) {
  const [focused, setFocused] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [classValue, setClassValue] = useState("");

  useEffect(() => {
    setErrors(validateFn(inputProps.inputValue));
    setClassValue(
      inputProps.errors && inputProps.errors.length > 0 ? "errors-true" : ""
    );
  }, [inputProps.inputValue, inputProps.errors, validateFn]);

  useEffect(() => {
    setShowIcon(
      inputProps.inputValue.length > 0 &&
        inputProps.errors.length === 0 &&
        !focused
    );
  }, [inputProps.inputValue, inputProps.errors, focused]);

  const pickRandomUsername = () => {
    setInputValue(generateUsername());
    setErrors([]);
  };

  const handleBlur = () => {
    setFocused(false);
    const validationErrors = validateFn(inputProps.inputValue);
    setErrors(validationErrors);
    setClassValue(validationErrors.length > 0 ? "errors-true" : "");
    return validationErrors;
  };

  const handleFocus = () => {
    setClassValue("");
    setFocused(true);
  };

  return {
    showIcon,
    classValue,
    pickRandomUsername,
    handleBlur,
    handleFocus,
    focused,
  };
}
