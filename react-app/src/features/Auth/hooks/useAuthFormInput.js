// useAuthFormInput.js
import { useCallback, useEffect, useMemo } from "react";

/**
 * A child hook that:
 *  - Delegates onBlur, onRotate to the parent
 *  - Decides iconType based on parent's errors + parent's blurred states
 */
export function useAuthFormInput(inputProps, blurred) {
  const hasErrors = inputProps.errors.length > 0;
  const classValue = hasErrors && blurred ? " errors-true" : "";

  const handleLabelClick = useCallback((e) => {
    const inputEl = e.target.parentElement.querySelector(
      "input, select, textarea"
    );
    if (inputEl) {
      inputEl.focus();
    }
  }, []);

  const handleBlur = useCallback(() => {
    if (typeof inputProps.onBlur === "function") {
      inputProps.onBlur();
    }
  }, [inputProps]);

  const pickRandomUsername = useCallback(() => {
    if (typeof inputProps.onRotate === "function") {
      inputProps.onRotate();
    }
  }, [inputProps]);

  const iconType = useMemo(() => {
    if (classValue === " errors-true") {
      return "error";
    }
    const isNotEmpty = inputProps.inputValue?.length > 0;
    if (isNotEmpty && !hasErrors && blurred) {
      return "valid";
    }
    return null;
  }, [classValue, hasErrors, blurred, inputProps.inputValue]);

  useEffect(() => {
    if (!blurred) {
      inputProps?.setBlurred(false);
    }
  }, [blurred]);

  return {
    handleLabelClick,
    handleBlur,
    pickRandomUsername,
    iconType,
    classValue,
  };
}
