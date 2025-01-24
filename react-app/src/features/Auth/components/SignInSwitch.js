import React from "react";
import { useAuthFlow } from "context/AuthFlowContext";

/**
 * Button that switches between login and signup forms
 * - prompt: text prompt to display before link
 * - linkText: text link should display
 */
export const SignInSwitch = ({ prompt, linkText }) => {
  const { openLogin, openSignupPage1 } = useAuthFlow();

  const switchAuthForms = () => {
    if (linkText === "Log In") {
      openLogin();
    } else {
      openSignupPage1();
    }
  };
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
