import React from "react";

export default function PreviewCommunityColorPickerSquare({ color, setTheme }) {
  return (
    <div
      className="preview-community-color-picker-square"
      style={{ background: color }}
      onClick={() => setTheme(color)}
    >
      &nbsp;
    </div>
  );
}
