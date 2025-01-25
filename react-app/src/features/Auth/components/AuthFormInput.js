import React from "react";
import { IconComponent, ErrorsDisplay } from "../components";
import { useAuthFormInput } from "../hooks";

/**
 * Reusable input box for auth forms
 * - props: Props specific to the type of input it is (username, email, etc.); refer to the form's custom hook to view full props
 * - onBlur: validation function
 * - icon:
 * - usernameTaken: flag for whether the username is taken or not; only matters for sign-up form's username input
 * - setTaken: flag for whether the username is taken or not; only matters for sign-up form's username input
 */

export function AuthFormInput({
  props,
  onBlur,
  icon,
  usernameTaken,
  setTaken,
}) {
  const {
    type,
    name,
    inputValue,
    setInputValue,
    errors = [],
    setErrors,
    label,
    autoCompleteStatus,
    maxLength,
    testId,
    focused,
    setFocused,
  } = props;

  const {
    handleBlur,
    handleFocus,
    handleLabelClick,
    showIcon,
    classValue,
    setClassValue,
    pickRandomUsername,
  } = useAuthFormInput(onBlur, props, usernameTaken, setTaken);

  return (
    <div
      className={`form-field-box${name === " signup-email" ? " h-100" : ""}${
        name === "username" ? " form-field-username" : ""
      }`}
    >
      <div className={`form-field ${classValue}`}>
        <input
          id={name}
          data-testid={testId}
          type={type}
          name={name}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete={autoCompleteStatus}
          placeholder=" "
          value={inputValue}
          maxLength={maxLength}
          className={classValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <label htmlFor={name} onClick={handleLabelClick}>
          {label}
          <span className="asterisk">*</span>
        </label>
        <div className="input-trailing-icons">
          {classValue === " errors-true" && (
            <IconComponent iconType="error" name={name} />
          )}
          {inputValue.length > 0 && errors.length === 0 && showIcon && (
            <IconComponent iconType="valid" name={name} />
          )}
          {icon === "rotate" && (
            <button
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
        focused={focused}
        name={name}
        usernameTaken={usernameTaken}
        setTaken={setTaken}
      />
    </div>
  );
}
