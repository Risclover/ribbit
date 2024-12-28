import React, { useEffect, useState } from "react";
import { IconComponent, ErrorsDisplay } from "../components";
import { generateUsername } from "../utils";
import { useAuthFormInput } from "../hooks";

export function AuthFormInput({ props, onBlur, icon, usernameTaken }) {
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

  const { showIcon, classValue, setClassValue, pickRandomUsername, usernameAvailable } =
    useAuthFormInput(onBlur, props, usernameTaken);

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
          {errors.length > 0 && !focused && (
            <IconComponent iconType="error" name={name} />
          )}
          {inputValue.length > 0 && errors.length === 0 && showIcon && (
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
        focused={focused}
        name={name}
      />
    </div>
  );
}
