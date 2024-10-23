import React from "react";
import { UsernameAvailability } from "./UsernameAvailability";
import { v4 as uuidv4 } from "uuid";

export function ErrorsDisplay({ errors, inputValue, focused, name }) {
  return (
    <div className="error-container">
      {errors && errors.length > 0 && (
        <div className="signup-form-errors">
          {errors.map((error) => (
            <div key={uuidv4()}>{error}</div>
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
