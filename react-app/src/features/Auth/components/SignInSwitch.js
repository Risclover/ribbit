import React from "react";

export const SignInSwitch = ({ prompt, linkText, switchAuthForms }) => {
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
