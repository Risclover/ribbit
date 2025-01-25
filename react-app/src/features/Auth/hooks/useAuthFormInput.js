import { useState, useEffect } from "react";
import { generateUsername } from "../utils";

export function useAuthFormInput(
  validateFn,
  inputProps,
  usernameTaken,
  setTaken
) {
  const [showIcon, setShowIcon] = useState(false);
  const [classValue, setClassValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [usernameAvailable, setUsernameAvailable] = useState(
    inputProps.inputValue.length > 2 &&
      errors.length === 0 &&
      !inputProps.focused
  );

  useEffect(() => {
    console.log("INPUT PROPS:", inputProps);
  }, []);

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
    setUsernameAvailable(!usernameTaken);
    setErrors([]);
    setTaken(false);
    console.log("usernameAvailable:", usernameAvailable);
  };

  const handleLabelClick = (e) => {
    e.target.parentElement.children[0].focus();
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
    inputProps.setFocused(true);
  };

  return {
    showIcon,
    classValue,
    setClassValue,
    pickRandomUsername,
    handleBlur,
    handleFocus,
    handleLabelClick,
    usernameAvailable,
  };
}
