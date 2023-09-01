import React, { useState } from "react";
import BannerHeight from "./BannerHeight";

export default function PreviewCommunityBanner({
  setOpenAppearance,
  community,
}) {
  const [activeRadio, setActiveRadio] = useState("");

  const options = ["Small • 64px", "Medium • 128px", "Large • 192px"];
  return (
    <div className="preview-community-color-theme">
      <h1>Banner</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Height</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <BannerHeight
              option={option}
              activeRadio={activeRadio}
              setActiveRadio={setActiveRadio}
            />
          ))}
        </div>
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Community Icon</h2>
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>

          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long">Save</button>
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
