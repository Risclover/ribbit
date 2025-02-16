import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToggleSwitch, DropBox } from "@/components";
import { CommunityNameOption } from "./CommunityNameOption";
import { useDispatch } from "react-redux";
import { updateSettingsNameIcon } from "store";
import { getCommunitySettings } from "store";
import { getCommunities } from "store";

// Could be in a constants file or just inline
const DEFAULT_ICON_URL = "https://i.imgur.com/9CI9hiO.png";

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
    uploadCommunityIcon,
    communitySetting,
  } = settingsState;

  const options = ["c/", "", "Hide"];
  const dispatch = useDispatch();

  // We'll track a local file for the icon
  const [iconFile, setIconFile] = useState(null);
  const [preview, setPreview] = useState(communityIcon);

  const handleErase = async () => {
    // 2. Update in DB: set communityIcon to the default URL
    await dispatch(
      updateSettingsNameIcon({
        settingsId: communitySetting.id,
        nameFormat,
        communityIcon: DEFAULT_ICON_URL,
        hideCommunityIcon,
      })
    );

    // 3. Re-fetch store data so our UI sees the update
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  };

  // In your form's handleSubmit:
  const handleSubmit = async () => {
    // if the user chose a file:
    if (iconFile) {
      // 1. upload file to server
      await uploadCommunityIcon(iconFile); // returns new icon path or updates DB
      // 2. re-fetch store data
      await dispatch(getCommunitySettings(community.id));
    } else if (preview === "") {
      // means user clicked trash
      await dispatch(
        updateSettingsNameIcon({
          settingsId: communitySetting.id,
          communityIcon: "", // instruct the server to remove it
          // ...
        })
      );
      await dispatch(getCommunitySettings(community.id));
    }

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
            setImage={setIconFile}
            preview={preview}
            setPreview={setPreview}
            defaultIcon={DEFAULT_ICON_URL}
            handleErase={handleErase}
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
