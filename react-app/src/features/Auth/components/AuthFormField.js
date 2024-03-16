import React from "react";

export const AuthFormField = ({
  type,
  name,
  inputValue,
  onChange,
  onBlur,
  onFocus,
  maxLength,
  label,
  testId,
}) => (
  <div>
    <input
      id={name}
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      value={inputValue}
      maxLength={maxLength}
      data-testid={testId}
    />
    <label htmlFor={name}>
      {label}
      <span className="asterisk">*</span>
    </label>
  </div>
);
