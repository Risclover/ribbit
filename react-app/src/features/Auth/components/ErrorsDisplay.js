import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UsernameAvailability } from "./UsernameAvailability";

/**
 * Errors displayed beneath each input box of the auth forms
 * - errors: displayed errors
 * - inputValue: value of the input box
 * - focused: whether or not the input box is currently focused
 * - name: name of the input box
 * - usernameTaken: whether or not the username is taken; only relevant for sign up form's 'username' input
 */
export function ErrorsDisplay({
  errors,
  inputValue,
  focused,
  name,
  usernameTaken,
}) {
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
          usernameTaken={usernameTaken}
        />
      )}
    </div>
  );
}
