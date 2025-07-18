import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UsernameAvailability } from "./UsernameAvailability";

/**
 * Displays any validation errors and optional “username available” message under the input. *
 * - errors: errors to display
 * - inputValue: value of the input box to validate against
 * - name: name of the input box
 * - blurred: whether or not the input box is focused
 */
export function ErrorsDisplay({ errors, inputValue, name, blurred }) {
  return (
    <div className="error-container">
      {errors && errors.length > 0 && blurred && (
        <div className="signup-form-errors">
          {errors.map((error) => (
            <div key={uuidv4()}>{error}</div>
          ))}
        </div>
      )}
      {/* "Nice! Username available" message, for Username input */}
      {name === "username" && (
        <UsernameAvailability
          value={inputValue}
          errors={errors}
          blurred={blurred}
        />
      )}
    </div>
  );
}
