import React from "react";

type Props = {
  num: number;
};

export function NotificationCircle({ num }: Props) {
  return (
    <span className="notification-circle-container">
      <span className="notification-circle">{num}</span>
    </span>
  );
}
