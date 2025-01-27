// src/features/CommunitySettings/components/PreviewCommunityColorTheme.jsx
import React, { useState } from "react";
import { DropBox } from "@/components";
import { PreviewCommunityColorThemeColor, BodyBgFormat } from "@/features";
import "../PreviewCommunity.css";
import { v4 as uuidv4 } from "uuid";

export function PreviewCommunityColorTheme({
  setOpenAppearance,
  settingsState,
}) {
  const {
    community,
    base,
    setBase,
    highlight,
    setHighlight,
    bgColor,
    setBgColor,
    backgroundImgFormat,
    setBackgroundImgFormat,
    backgroundImg,
    setBackgroundImg,
    saveColorTheme,
  } = settingsState;

  const [imageFile, setImageFile] = useState(null);

  const handleSave = async () => {
    await saveColorTheme(imageFile);
    setOpenAppearance(false);
  };

  return (
    <div className="preview-community-color-theme">
      <h1>Color theme</h1>

      <div className="preview-community-theme-colors-box">
        <h2>Theme Colors</h2>
        <PreviewCommunityColorThemeColor
          name="Base"
          theme={base}
          setTheme={setBase}
        />
        <PreviewCommunityColorThemeColor
          name="Highlight"
          theme={highlight}
          setTheme={setHighlight}
        />
      </div>

      <div className="preview-community-theme-colors-box">
        <h2>Body Background</h2>
        <PreviewCommunityColorThemeColor
          name="Color"
          theme={bgColor}
          setTheme={setBgColor}
        />

        <div className="preview-community-theme-background-img">
          <h3>Image</h3>
          <DropBox
            preview={backgroundImg}
            setPreview={setBackgroundImg}
            setImage={setImageFile}
          />
          <div className="body-bg-formats" role="radiogroup">
            <input type="hidden" value={backgroundImgFormat} readOnly />
            {["fill", "tile", "center"].map((format) => (
              <BodyBgFormat
                key={uuidv4()}
                format={format}
                backgroundImgFormat={backgroundImgFormat}
                setBackgroundImgFormat={setBackgroundImgFormat}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleSave}>
          Save
        </button>
        <button
          className="blue-btn-unfilled btn-long"
          onClick={() => setOpenAppearance(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
