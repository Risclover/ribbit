// useAuthFormInput.js
import { useCallback, useEffect, useMemo } from "react";

/**
 * A child hook that:
 *  - Delegates onBlur, onRotate to the parent
 *  - Decides iconType based on parent's errors + parent's blurred states
 *  - DOES NOT run local validation
 */
export function useAuthFormInput(inputProps, usernameBlurred) {
  // We have parent's array of errors
  const hasErrors = inputProps.errors.length > 0;

  // We'll add "errors-true" class if we have errors AND the user has blurred
  const classValue = hasErrors && usernameBlurred ? " errors-true" : "";

  // Label click => focus the input (optionally)
  const handleLabelClick = useCallback((e) => {
    const inputEl = e.target.parentElement.querySelector(
      "input, select, textarea"
    );
    if (inputEl) {
      inputEl.focus();
    }
  }, []);

  // Just call parent's onBlur
  const handleBlur = useCallback(() => {
    if (typeof inputProps.onBlur === "function") {
      inputProps.onBlur();
    }
  }, [inputProps]);

  // If we have a "rotate" scenario
  const pickRandomUsername = useCallback(() => {
    if (typeof inputProps.onRotate === "function") {
      inputProps.onRotate();
    }
  }, [inputProps]);

  // Determine the iconType:
  // Show "error" if we have errors & user has blurred
  // Show "valid" if no errors, user typed something, and user has blurred
  const iconType = useMemo(() => {
    if (classValue === " errors-true") {
      return "error";
    }
    const isNotEmpty = inputProps.inputValue?.length > 0;
    if (isNotEmpty && !hasErrors && usernameBlurred) {
      return "valid";
    }
    return null;
  }, [classValue, hasErrors, usernameBlurred, inputProps.inputValue]);

  useEffect(() => {
    if (!usernameBlurred) {
      inputProps?.setBlurred(false);
    }
  }, [usernameBlurred]);

  return {
    handleLabelClick,
    handleBlur,
    pickRandomUsername,
    iconType,
    classValue,
  };
}
