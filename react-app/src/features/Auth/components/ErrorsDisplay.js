import React from "react";
import { UsernameAvailability } from "./UsernameAvailability";

export function ErrorsDisplay({ errors, inputValue, focused, name }) {
  return (
    <div className="error-container">
      {errors && errors.length > 0 && (
        <div className="signup-form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
      {name === "username" && (
        <UsernameAvailability
          value={inputValue}
          errors={errors}
          focused={focused}
        />
      )}
    </div>
  );
}
