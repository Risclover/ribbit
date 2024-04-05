import React from "react";
import "./Tooltip.css";

export const Tooltip = ({ direction, text }) => {
  return <div className={`tooltip tooltip-${direction}`}>{text}</div>;
};
