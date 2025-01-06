import React, { useEffect } from "react";

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
        console.log("openPicker:", openPicker);
      }}
    ></div>
  );
}
