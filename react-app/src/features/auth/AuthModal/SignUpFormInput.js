import React from "react";

export default function SignUpFormInput({
  type,
  name,
  onChangeValue,
  inputValue,
  errors,
  label,
  autoCompleteStatus,
  maxLength,
}) {
  return (
    <div className="form-field-box">
      <div className="form-field">
        <input
          type={type}
          name={name}
          onChange={(e) => onChangeValue(e.target.value)}
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
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    </div>
  );
}
