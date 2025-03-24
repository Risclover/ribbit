import React from "react";

/**
 * The little green "Nice! Username available" message that shows under the username input box of the sign-up form if the username is available. Requirements:
 * - user must not be focused on the box
 * - there must be no errors
 * - there is something in the input box (it isn't empty)
 */
export function UsernameAvailability({ errors, blurred, value }) {
  if (blurred && errors.length === 0 && value.trim() !== "") {
    return <div className="username-accepted">Nice! Username available</div>;
  }
  return null;
}
