import { FC, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  /** Where the tooltip should appear relative to the target. */
  direction: "top" | "right" | "bottom" | "left";
  /** Label to display in the tooltip. */
  text: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({ direction, text }) => (
  <div className={`tooltip tooltip-${direction}`}>{text}</div>
);
