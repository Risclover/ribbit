import React, { useEffect, useState } from "react";
import { PreviewCommunityColorPickerSquare } from "./PreviewCommunityColorPickerSquare";

export function PreviewCommunityColorPicker({ theme, setTheme, community }) {
  const [showBrowserColorPicker, setShowBrowserColorPicker] = useState(false);

  const colors = [
    "#EA0027",
    "#FF4500",
    "#FFB000",
    "#FFD635",
    "#94E044",
    "#46D160",
    "#0DD3BB",
    "#00A6A5",
    "#B8001F",
    "#CC3600",
    "#CC8B00",
    "#CCAC2B",
    "#73AD34",
    "#349E48",
    "#0AA18F",
    "#007373",
    "var(--highlight-color)",
    "#014980",
    "#7193FF",
    "#FF66AC",
    "#9E8D49",
    "#DDBD37",
    "#EDEFF1",
    "#373C3F",
    "#005BA1",
    "#0266B3",
    "#5A74CC",
    "#CC5289",
    "#6B6031",
    "#AB912B",
    "#BBBDBF",
    "#646D73",
  ];

  useEffect(() => {
    if (theme?.length === 6 && !theme?.startsWith("#")) {
      setTheme("#" + theme);
    }
  }, [theme]);

  const handleShowBrowserColorPicker = () => {
    setShowBrowserColorPicker(true);
  };
  return (
    <>
      <div className="preview-community-color-picker-title">Color Picker</div>
      <div className="preview-community-color-picker-grid">
        {colors.map((color) => (
          <PreviewCommunityColorPickerSquare
            community={community}
            color={color}
            setTheme={setTheme}
          />
        ))}
      </div>
      <div className="preview-community-color-picker-title">Hex Code</div>
      <div className="preview-community-color-picker-hexcode">
        <div
          className="preview-community-color-picker-hexcode-color"
          style={{ background: theme }}
        ></div>
        <input
          type="text"
          className="preview-community-color-picker-hexcode-input"
          maxLength={7}
          placeholder="Hex #"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>
      <label
        className="use-browser-color-picker"
        onClick={handleShowBrowserColorPicker}
      >
        Use browser color picker{" "}
        {showBrowserColorPicker && (
          <input
            type="color"
            className="preview-community-browser-color-picker"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          />
        )}
      </label>
    </>
  );
}
