import React from "react";
import useSignInSwitch from "../hooks/useSignInSwitch";

/**
 * Link that toggles between "Log In" and "Sign Up", taking the user to the respective form when clicked.
 *
 * @param prompt: text prompt to accompany link
 * @param linkText: link text
 */
export const SignInSwitch = ({ prompt, linkText }) => {
  const { switchAuthForms } = useSignInSwitch({ linkText });

  return (
    <p className="sign-in-switch">
      {prompt}
      <span
        onKeyDown={(e) => e.key === "Enter" && switchAuthForms()}
        onClick={switchAuthForms}
        tabIndex={0}
      >
        {linkText}
      </span>
    </p>
  );
};
