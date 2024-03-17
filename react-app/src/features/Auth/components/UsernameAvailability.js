import React from "react";

export function UsernameAvailability({ value, errors, focused }) {
  const usernameAvailable = value.length > 2 && errors.length === 0 && !focused;

  return usernameAvailable ? (
    <div className="username-accepted">Nice! Username available</div>
  ) : null;
}
