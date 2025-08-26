import React from "react";
import {
  AuthModalErrorIcon,
  AuthModalRotateIcon,
  AuthModalValidIcon,
} from "@/assets";

/**
 * Renders the correct icon image or SVG based on iconType.
 *
 * @param iconType: type of icon to display
 *        - "error": input is invalid
 *        - "valid": input is valid
 *        - "rotate": for 'generate random username' tool
 * @param name: name of input box
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
