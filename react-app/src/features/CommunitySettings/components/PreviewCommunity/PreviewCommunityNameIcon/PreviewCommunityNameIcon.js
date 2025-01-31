import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToggleSwitch, DropBox } from "@/components";
import { CommunityNameOption } from "./CommunityNameOption";

export function PreviewCommunityNameIcon({ setOpenAppearance, settingsState }) {
  const {
    community,
    nameFormat,
    setNameFormat,
    communityIcon,
    setCommunityIcon,
    hideCommunityIcon,
    setHideCommunityIcon,
    saveNameIcon,
  } = settingsState;

  const options = ["c/", "", "Hide"];

  // We'll track a local file for the icon
  const [iconFile, setIconFile] = useState(null);
  const [preview, setPreview] = useState(communityIcon);

  const handleSubmit = async () => {
    // If user has chosen a new iconFile, we upload it
    await saveNameIcon(iconFile);
    document.documentElement.style.setProperty(
      "--preview-community-name-format",
      nameFormat
    );
    setOpenAppearance(false);
  };

  return (
    <div className="preview-community-name-icon">
      <h1>Name & icon</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Community Name Format</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <CommunityNameOption
              key={uuidv4()}
              community={community}
              title={option}
              activeRadio={nameFormat}
              setActiveRadio={setNameFormat}
            />
          ))}
        </div>
      </div>

      <div className="preview-community-theme-colors-box">
        <h2>Community Icon</h2>
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>
          <DropBox
            dropboxType="community_icon"
            community={community}
            setImage={setIconFile}
            startingImage={communityIcon}
            preview={preview}
            setPreview={setPreview}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>

      <div className="preview-community-theme-colors-box">
        <h2 style={{ color: "var(--main-text-color)" }}>Community Icon</h2>
        <label className="preview-community-toggle-switch" name="switch">
          <ToggleSwitch
            checked={hideCommunityIcon}
            setChecked={setHideCommunityIcon}
            community={community}
          />
          <div className="preview-community-toggle-switch-txt">
            <h3>Hide Community Icon in Banner</h3>
            <p>Your Community Icon will still display in other areas</p>
          </div>
        </label>
      </div>

      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleSubmit}>
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
