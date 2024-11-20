import React from "react";

export function PreviewCommunityColorPickerSquare({
  color,
  setTheme,
  setOpenPicker,
}) {
  return (
    <div
      className="preview-community-color-picker-square"
      style={{ background: color }}
      onClick={() => {
        setTheme(color);
        setOpenPicker(false);
      }}
    ></div>
  );
}
