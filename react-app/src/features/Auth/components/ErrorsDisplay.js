import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UsernameAvailability } from "./UsernameAvailability";

/**
 * 
 */
export function ErrorsDisplay({
  errors,
  inputValue,
  name,
  blurred,
  usernameTaken,
}) {
  return (
    <div className="error-container">
      {errors && errors.length > 0 && blurred && (
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
          blurred={blurred}
          usernameTaken={usernameTaken}
        />
      )}
    </div>
  );
}
