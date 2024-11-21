import { AuthModalErrorIcon } from "assets/icons/AuthModalErrorIcon";
import { AuthModalRotateIcon } from "assets/icons/AuthModalRotateIcon";
import { AuthModalValidIcon } from "assets/icons/AuthModalValidIcon";
import React from "react";

export const IconComponent = ({ iconType, name }) => {
  switch (iconType) {
    case "error":
      return <AuthModalErrorIcon name={name} />;

    case "valid":
      return <AuthModalValidIcon name={name} />;

    case "rotate":
      return <AuthModalRotateIcon />;

    default:
      return null;
  }
};
