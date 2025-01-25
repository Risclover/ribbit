import React from "react";
import {
  AuthModalErrorIcon,
  AuthModalRotateIcon,
  AuthModalValidIcon,
} from "@/assets";

/**
 * Reusable icon component for each input box; "valid" (input is valid), "error" (input is invalid), or "rotate" (for rotate username option)
 * - iconType: type of icon to display
 * - name: name of input box
 */
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
