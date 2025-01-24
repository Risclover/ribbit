import React from "react";

/**
 * custom validation message that says the username given is available
 * - usernameTaken: whether or not the username is taken
 * - errors: list of errors for username input
 * - focused: whether or not username input is currently focused
 * - value: value of username input
 */
export function UsernameAvailability({
  usernameTaken,
  errors,
  focused,
  value,
}) {
  // Show the success message only if:
  //   - The user is not currently focused on the input (optional)
  //   - The username is not taken
  //   - There are no validation errors
  //   - The user has typed something
  if (
    !focused &&
    !usernameTaken &&
    errors.length === 0 &&
    value.trim() !== ""
  ) {
    return <div className="username-accepted">Nice! Username available</div>;
  } else {
    return null;
  }
}
