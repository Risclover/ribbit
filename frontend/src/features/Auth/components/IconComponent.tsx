import React from "react";
import {
  AuthModalErrorIcon,
  AuthModalRotateIcon,
  AuthModalValidIcon,
} from "@/assets";

/**
 * A small component rendering the correct icon image or SVG based on iconType.
 * - iconType: type of icon to display
 *     - "error": input is invalid
 *     - "valid": input is valid
 *     - "rotate": for 'generate random username' tool
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
