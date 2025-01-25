// UsernameAvailability.js
import React from "react";

export function UsernameAvailability({
  usernameTaken,
  errors,
  blurred,
  value,
}) {
  if (
    blurred && // only show if user has blurred
    !usernameTaken &&
    errors.length === 0 &&
    value.trim() !== ""
  ) {
    return <div className="username-accepted">Nice! Username available</div>;
  }
  return null;
}
