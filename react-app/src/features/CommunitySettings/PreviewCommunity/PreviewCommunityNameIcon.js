import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getSingleCommunity,
  defaultCommunityImg,
  resetToDefaultIcon,
  updateSettingsNameIcon,
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
  const [defaultIcon, setDefaultIcon] = useState(image === undefined);
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id].communityIcon
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image === "https://i.imgur.com/9CI9hiO.png") {
      dispatch(defaultCommunityImg(community?.id));
      dispatch(getSingleCommunity(community?.id));
      setOpenAppearance(false);
    } else if (image && image !== "https://i.imgur.com/9CI9hiO.png") {
      handleImgUpload();
    }

    if (defaultIcon) {
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

    dispatch(getSingleCommunity(community?.id));
    setOpenAppearance(false);
  };

  const defaultCommunityIcon = () => {
    dispatch(
      resetToDefaultIcon(community?.communitySettings[community?.id].id)
    );

    setCommunityIcon("https://i.imgur.com/9CI9hiO.png");
  };

  const handlePreview = () => {
    return;
  };

  const handleDelete = (e) => {
    setDefaultIcon(true);
    setImage("https://i.imgur.com/9CI9hiO.png");

    handleSubmit(e);
  };

  const handleImgUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(`/api/communities/${community?.id}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community?.id));
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
            setDefaultIcon={setDefaultIcon}
            handlePreview={handlePreview}
            handleDelete={handleDelete}
            handleImgUpload={handleImgUpload}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-colors-box">
        <h2 style={{ color: "#1c1c1c" }}>Community Icon</h2>
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
