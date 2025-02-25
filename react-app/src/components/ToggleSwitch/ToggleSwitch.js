import React from "react";
import "./ToggleSwitch.css";

export function ToggleSwitch({ checked, setChecked }) {
  return (
    <div className="switch">
      <input
        type="checkbox"
        checked={checked}
        name="switch"
        onChange={() => setChecked(!checked)}
        tabIndex={-1}
      />
      <span className="slider round"></span>
    </div>
  );
}
