import React from "react";

export function PreviewCommunityColorPickerSquare({ color, setTheme }) {
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
