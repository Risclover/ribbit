import React from "react";

export const SignInSwitch = ({ prompt, onClick, linkText }) => {
  return (
    <p className="sign-in-switch">
      {prompt}
      <span onClick={onClick}>{linkText}</span>
    </p>
  );
};
