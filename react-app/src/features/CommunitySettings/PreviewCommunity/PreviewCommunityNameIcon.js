import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getSingleCommunity,
  defaultCommunityImg,
  resetToDefaultIcon,
  updateSettingsNameIcon,
  getCommunitySettings,
  getCommunities,
} from "../../../store";
import { ToggleSwitch, DropBox } from "../../../components";
import { CommunityNameOption } from "./CommunityNameOption";

export function PreviewCommunityNameIcon({
  setOpenAppearance,
  community,
  activeRadio,
  setActiveRadio,
  communityIcon,
  setCommunityIcon,
  checked,
  setChecked,
}) {
  const dispatch = useDispatch();
  const options = ["c/", "", "Hide"];

  const [image, setImage] = useState(
    community?.communitySettings[community?.id].communityIcon
  );
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id].communityIcon !==
      "https://i.imgur.com/9CI9hiO.png"
      ? community?.communitySettings[community?.id].communityIcon
      : null
  );
  const [defaultIcon, setDefaultIcon] = useState(preview === null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image === "https://i.imgur.com/9CI9hiO.png") {
      dispatch(defaultCommunityImg(community?.id));
      dispatch(getCommunities());
      setOpenAppearance(false);
    } else if (image && image !== "https://i.imgur.com/9CI9hiO.png") {
      handleImgUpload();
      setDefaultIcon(false);
      setPreview(image);
    }

    if (checked) {
      defaultCommunityIcon();
    } else {
      handleImgUpload();
    }

    dispatch(
      updateSettingsNameIcon({
        settingsId: community?.id,
        nameFormat: activeRadio,
        communityIcon: communityIcon,
        hideCommunityIcon: checked,
      })
    );

    dispatch(getCommunities());
    dispatch(getCommunitySettings(community?.id));
    setOpenAppearance(false);
  };

  const defaultCommunityIcon = () => {
    dispatch(
      resetToDefaultIcon(community?.communitySettings[community?.id].id)
    );

    setCommunityIcon("https://i.imgur.com/9CI9hiO.png");
  };

  const handlePreview = () => {
    if (preview === "https://i.imgur.com/9CI9hiO.png" || preview === null) {
      setDefaultIcon(true);
    } else {
      setDefaultIcon(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setPreview(null);
    setDefaultIcon(true);
    setCommunityIcon("https://i.imgur.com/9CI9hiO.png");
  };

  const handleImgUpload = async () => {
    const formData = new FormData();
    if (image === null || image === "" || image === undefined) {
      formData.append("image", "");
    } else {
      formData.append("image", image);
    }

    const res = await fetch(`/api/communities/${community?.id}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getCommunities());
    }
  };

  return (
    <div className="preview-community-name-icon">
      <h1>Name & icon</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Community Name Format</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <CommunityNameOption
              community={community}
              title={option}
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
          <DropBox
            dropboxType="community_icon"
            community={community}
            setImage={setImage}
            startingImage={
              community?.communitySettings[community?.id].communityIcon
            }
            preview={preview}
            setPreview={setPreview}
            handlePreview={handlePreview}
            handleDelete={handleDelete}
            handleImgUpload={handleImgUpload}
            defaultIcon={defaultIcon}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-colors-box">
        <h2 style={{ color: "var(--main-text-color)" }}>Community Icon</h2>
        <label className="preview-community-toggle-switch" name="switch">
          <ToggleSwitch
            checked={checked}
            setChecked={setChecked}
            community={community}
          />
          <div className="preview-community-toggle-switch-txt">
            <h3>Hide Community Icon in Banner</h3>
            <p>
              Your Community Icon will still display in other areas of Reddit
            </p>
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
