// AuthFormInput.js
import React from "react";
import { useAuthFormInput } from "../hooks/useAuthFormInput";
import { IconComponent, ErrorsDisplay } from "../components";

export function AuthFormInput({ props, icon, blurred }) {
  const {
    handleLabelClick,
    handleBlur,
    pickRandomUsername,
    iconType,
    classValue,
  } = useAuthFormInput(props, blurred);

  const {
    name,
    type,
    inputValue,
    setInputValue,
    errors,
    setBlurred,
    onBlur, // from parent
    onRotate, // from parent
    label,
    maxLength,
    autoCompleteStatus,
    testId,
  } = props;

  return (
    <div
      className={`form-field-box${
        name === "username" ? " form-field-username" : ""
      }`}
    >
      <div className={`form-field ${classValue}`}>
        <input
          id={name}
          type={type}
          data-testid={testId}
          name={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          placeholder=" "
          maxLength={maxLength}
          autoComplete={autoCompleteStatus}
          onFocus={() => setBlurred(false)}
          // no real-time focus, etc.
        />
        <label htmlFor={name} onClick={handleLabelClick}>
          {label}
          <span className="asterisk">*</span>
        </label>
        <div className="input-trailing-icons">
          {iconType === "error" && (
            <IconComponent iconType="error" name={name} />
          )}
          {iconType === "valid" && (
            <IconComponent iconType="valid" name={name} />
          )}
          {icon === "rotate" && (
            <button
              aria-label="Get randomized username"
              className="generate-username-btn"
              type="button"
              onClick={pickRandomUsername}
            >
              <IconComponent iconType="rotate" name={name} />
            </button>
          )}
        </div>
      </div>

      <ErrorsDisplay
        errors={errors}
        inputValue={inputValue}
        name={name}
        // We'll also pass `blurred` to show "Nice! Username available" only if blurred is true
        blurred={blurred}
      />
    </div>
  );
}
