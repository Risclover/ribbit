import React from "react";

export function SignUpFormInput({ props, onChange }) {
  const {
    type,
    name,
    inputValue,
    errors,
    label,
    autoCompleteStatus,
    maxLength,
  } = props;

  return (
    <div className="form-field-box">
      <div className="form-field">
        <input
          type={type}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoCompleteStatus}
          placeholder=" "
          value={inputValue}
          maxLength={maxLength}
          className={errors && errors.length > 0 ? "errors-true" : ""}
        />
        <label onClick={(e) => e.target.parentElement.children[0].focus()}>
          {label}
        </label>
      </div>
      <div className="signup-form-errors">
        {errors &&
          errors.length > 0 &&
          errors.map((error, ind) => <div key={ind}>{error}</div>)}
      </div>
    </div>
  );
}
