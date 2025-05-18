import React from "react";
import { IconComponent, ErrorsDisplay } from "./";
import { useAuthFormInput } from "../hooks";

/**
 * A reusable input field with built-in error display and icons.
 * - handleLabelClick: what should happen when the user clicks on the label
 * - handleBlur: what should happen when the user unfocuses the input box
 * - pickRandomUsername: generate random username
 * - iconType: type of icon to show
 * - classValue: class value of the input box (mostly to control error styles)
 */
export function AuthFormInput({ props, icon, blurred }) {
  const {
    handleLabelClick,
    handleBlur,
    pickRandomUsername,
    iconType,
    classValue,
    enterKey,
  } = useAuthFormInput(props, blurred);

  const {
    name,
    type,
    inputValue,
    setInputValue,
    errors,
    setBlurred,
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
          className="auth-form-input-field"
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
          onKeyDown={enterKey}
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
        blurred={blurred}
      />
    </div>
  );
}
