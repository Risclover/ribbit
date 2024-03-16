import { useState, useEffect } from "react";

export const useFormInput = (initialValue, name, validateInput, onBlur) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const validationErrors = validateInput ? validateInput(inputValue) : [];
    setErrors(validationErrors);
  }, [inputValue, validateInput]);

  const handleBlur = () => {
    setFocused(false);
    const newErrors = onBlur ? onBlur() : [];
    setErrors(newErrors);
  };

  const handleFocus = () => {
    setFocused(true);
    setErrors([]);
  };

  return {
    inputValue,
    setInputValue,
    errors,
    focused,
    handleBlur,
    handleFocus,
    setFocused,
  };
};
