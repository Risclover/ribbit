import React from "react";

export function PreviewCommunityColorPickerSquare({
  color,
  setTheme,
  setOpenPicker,
  openPicker,
}) {
  return (
    <div
      className="preview-community-color-picker-square"
      style={{ background: color }}
      onClick={() => {
        setOpenPicker(false);
        setTheme(color);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setOpenPicker(false);
          setTheme(color);
        }
      }}
      tabIndex={0}
    ></div>
  );
}
