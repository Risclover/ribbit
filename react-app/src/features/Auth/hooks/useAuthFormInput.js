import { useState, useEffect } from "react";
import { generateUsername } from "../utils";

export function useAuthFormInput(validateFn, inputProps, usernameTaken) {
  const [showIcon, setShowIcon] = useState(false);
  const [classValue, setClassValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [usernameAvailable, setUsernameAvailable] = useState(
    inputProps.inputValue.length > 2 &&
      errors.length === 0 &&
      !inputProps.focused
  );

  useEffect(() => {
    setErrors(validateFn(inputProps?.inputValue));

    setClassValue(
      inputProps?.errors && inputProps?.errors.length > 0 && !inputProps.focused
        ? " errors-true"
        : ""
    );
  }, [validateFn, inputProps.focused]);

  useEffect(() => {
    setShowIcon(
      inputProps?.inputValue.length > 0 &&
        inputProps?.errors.length === 0 &&
        !inputProps.focused
    );
  }, [validateFn, errors]);

  const pickRandomUsername = () => {
    inputProps?.setInputValue(generateUsername());
    setUsernameAvailable(usernameTaken);
    setErrors([]);
    console.log("usernameAvailable:", usernameAvailable);
  };

  const handleBlur = () => {
    inputProps.setFocused(false);
    const validationErrors = validateFn(inputProps?.inputValue);
    inputProps?.setErrors(validationErrors);
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
    setClassValue,
    pickRandomUsername,
    handleBlur,
    handleFocus,
    usernameAvailable,
  };
}
