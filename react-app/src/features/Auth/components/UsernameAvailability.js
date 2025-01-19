import React from "react";

export function UsernameAvailability({
  value,
  errors,
  focused,
  usernameTaken,
}) {
  const usernameAvailable = value.length > 2 && errors.length === 0 && !focused;

  return !usernameTaken ? (
    <div className="username-accepted">Nice! Username available</div>
  ) : (
    <></>
  );
}
