import React from "react";
import useSignInSwitch from "../hooks/useSignInSwitch";

/**
 * Button that switches between login and signup forms
 * - prompt: text prompt to display before link
 * - linkText: text link should display
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
