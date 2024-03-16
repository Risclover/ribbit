import React, { useEffect, useState } from "react";
import { generateUsername } from "../utils/generateUsername";
import { IconComponent } from "./IconComponent";

export function AuthFormInput({ props, onChange, onBlur, icon }) {
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
  } = props;

  const [classValue, setClassValue] = useState("errors-true");
  const [focused, setFocused] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(
    name === "username" &&
      errors.length === 0 &&
      inputValue.length > 2 &&
      !focused
  );
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setErrors(errors);
    setClassValue(errors && errors.length > 0 ? " errors-true" : "");
  }, [errors]);

  useEffect(() => {
    setUsernameAvailable(
      name === "username" &&
        errors.length === 0 &&
        inputValue.length > 2 &&
        !focused
    );
  }, [errors, name, inputValue, focused]);

  const pickRandomUsername = () => {
    setInputValue(generateUsername());
    setErrors([]);
  };

  useEffect(() => {
    setShowIcon(inputValue.length > 0 && errors.length === 0 && !focused);
  }, [inputValue, errors, focused]);

  return (
    <div
      className={`form-field-box${name === "signup-email" ? " h-100" : ""}${
        name === "username" ? " form-field-username" : ""
      }`}
    >
      <div className={`form-field${classValue}`}>
        <input
          id={name}
          data-testid={testId}
          type={type}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoCompleteStatus}
          placeholder=" "
          value={inputValue}
          maxLength={maxLength}
          className={classValue}
          onBlur={() => {
            setFocused(false);
            setErrors(onBlur());
            if (errors && errors.length > 0) setClassValue(" errors-true");
          }}
          onFocus={() => {
            setClassValue("");
            setFocused(true);
          }}
        />
        <label
          htmlFor={name}
          onClick={(e) => e.target.parentElement.children[0].focus()}
        >
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
      <div className="error-container">
        <div className="signup-form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        {usernameAvailable && (
          <div className="username-accepted">Nice! Username available </div>
        )}
      </div>
    </div>
  );
}
