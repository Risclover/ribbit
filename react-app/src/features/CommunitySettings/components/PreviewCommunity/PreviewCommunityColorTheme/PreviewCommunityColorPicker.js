// PreviewCommunityColorPicker.jsx

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PreviewCommunityColorPickerSquare } from "./PreviewCommunityColorPickerSquare";
import { colorThemeColors as colors } from "../../../data/colorThemeColors";

/**
 * @param {string}   theme         Currently selected color (e.g. "#0079d3").
 * @param {Function} setTheme      Callback to update the color in parent state.
 * @param {Function} setOpenPicker Function to toggle the color picker’s visibility (if desired).
 */
export function PreviewCommunityColorPicker({
  theme,
  setTheme,
  setOpenPicker,
}) {
  const [showBrowserPicker, setShowBrowserPicker] = useState(false);

  // If the user typed 6 hex chars without a "#", prepend it
  useEffect(() => {
    if (theme?.length === 6 && !theme.startsWith("#")) {
      setTheme(`#${theme}`);
    }
  }, [theme, setTheme]);

  const handleBrowserPickerToggle = (e) => {
    e.stopPropagation();
    setShowBrowserPicker((prev) => !prev);
  };

  return (
    <div>
      <div className="preview-community-color-picker-title">Color Picker</div>

      {/* Preset squares */}
      <div className="preview-community-color-picker-grid">
        {colors.map((color) => (
          <PreviewCommunityColorPickerSquare
            key={uuidv4()}
            color={color}
            setTheme={setTheme}
            setOpenPicker={setOpenPicker}
          />
        ))}
      </div>

      {/* Manual Hex Entry */}
      <div className="preview-community-color-picker-title">Hex Code</div>
      <div className="preview-community-color-picker-hexcode">
        <div
          className="preview-community-color-picker-hexcode-color"
          style={{ background: theme }}
        />
        <input
          type="text"
          className="preview-community-color-picker-hexcode-input"
          maxLength={7}
          placeholder="#000000"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>

      {/* Optional browser color picker */}
      <div className="use-browser-color-picker">
        <label className="use-browser-color-picker" onClick={handleBrowserPickerToggle}>
          {showBrowserPicker ? "Close" : "Use"} Browser Color Picker
          {showBrowserPicker && (
            <input
              type="color"
              className="preview-community-browser-color-picker"
              onChange={(e) => setTheme(e.target.value)}
              value={theme || "#ffffff"}
              onClick={(e) => e.stopPropagation()}
              onBlur={() => setShowBrowserPicker(false)} // optional if you want to auto-close
            />
          )}
        </label>
      </div>

      <label
        className="use-browser-color-picker"
        onClick={handleBrowserPickerToggle}
      >
        Use browser color picker{" "}
        {showBrowserPicker && (
          <input
            type="color"
            className="preview-community-browser-color-picker"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          />
        )}
      </label>
    </div>
  );
}
