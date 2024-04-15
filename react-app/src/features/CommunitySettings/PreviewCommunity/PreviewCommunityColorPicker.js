import React, { useEffect, useState } from "react";
import { PreviewCommunityColorPickerSquare } from "./PreviewCommunityColorPickerSquare";
import { colorThemeColors as colors } from "./colorThemeColors";

export function PreviewCommunityColorPicker({ theme, setTheme, community }) {
  const [showBrowserColorPicker, setShowBrowserColorPicker] = useState(false);

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
