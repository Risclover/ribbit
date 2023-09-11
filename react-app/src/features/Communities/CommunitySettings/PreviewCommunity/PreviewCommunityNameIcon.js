import React, { useEffect, useState } from "react";
import CommunityNameOption from "./CommunityNameOption";
import { FaTrash } from "react-icons/fa6";
import { RiUploadCloudFill } from "react-icons/ri";
import DropBox from "../../../../components/DragNDropImageUpload/DropBox";
import { useDispatch } from "react-redux";
import { getSingleCommunity } from "../../../../store/one_community";
import {
  defaultCommunityImg,
  editCommunityTheme,
} from "../../../../store/communities";
import {
  resetToDefault,
  resetToDefaultIcon,
  updateSettingsNameIcon,
} from "../../../../store/community_settings";
import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch";

export default function PreviewCommunityNameIcon({
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
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [defaultIcon, setDefaultIcon] = useState(image === undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image === "https://i.imgur.com/9CI9hiO.png") {
      dispatch(defaultCommunityImg(community.id));
      dispatch(getSingleCommunity(community.id));
      setOpenAppearance(false);
    } else if (image && image !== "https://i.imgur.com/9CI9hiO.png") {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`/api/communities/${community.id}/img`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await res.json();
        dispatch(getSingleCommunity(community.id));
        setOpenAppearance(false);
      } else {
        setErrorMsg(
          "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
        );

        console.log(errorMsg);
      }
    }

    if (defaultIcon) {
      defaultCommunityIcon();
    } else {
      changeCommunityIcon();
    }

    dispatch(
      updateSettingsNameIcon({
        settingsId: community.id,
        nameFormat: activeRadio,
        communityIcon: communityIcon,
        hideCommunityIcon: checked,
      })
    );

    dispatch(getSingleCommunity(community.id));
    setOpenAppearance(false);
  };

  const defaultCommunityIcon = () => {
    dispatch(resetToDefaultIcon(community.communitySettings[community.id].id));

    setCommunityIcon("https://i.imgur.com/9CI9hiO.png");
  };

  const changeCommunityIcon = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(`/api/communities/${community?.id}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community?.id));
      setOpenAppearance(false);
    } else {
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
      );
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
              community.communitySettings[community.id].communityIcon
            }
            setDefaultIcon={setDefaultIcon}
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
