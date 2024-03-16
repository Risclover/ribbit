import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCommunitySettings,
  updateSettingsBanner,
  getSingleCommunity,
  getCommunities,
} from "../../../store";
import { DropBox } from "../../../components";
import { PreviewCommunityBannerColor, BannerHeight } from "../..";

export function PreviewCommunityBanner({
  setOpenAppearance,
  community,
  activeRadio,
  setActiveRadio,
  bannerColor,
  setBannerColor,
  height,
  setHeight,
  customBannerColor,
  setCustomBannerColor,
  bannerImg,
  bannerImgFormat,
}) {
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(
    community.communitySettings[community.id].bannerImg
  );
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (activeRadio === "small") setHeight("80px");
    if (activeRadio === "medium") setHeight("144px");
    if (activeRadio === "large") setHeight("208px");
  }, [activeRadio]);

  const options = ["Small", "Medium", "Large"];

  useEffect(() => {
    if (bannerColor !== "#33a8ff") {
      setCustomBannerColor(true);
    }
  }, [bannerColor]);

  const handleBanner = async () => {
    if (image) {
      changeBannerImg();
    } else {
      setImage(null);
    }

    const payload = {
      settingsId: community.communitySettings[community.id].id,
      bannerHeight: height,
      bannerColor: bannerColor,
      customBannerColor: customBannerColor,
      bannerImg: image ? bannerImg : "",
      bannerImgFormat: bannerImgFormat,
      secondaryBannerImg:
        community.communitySettings[community.id].secondaryBannerImg,
      hoverBannerImg: community.communitySettings[community.id].hoverBannerImg,
      secondaryBannerFormat:
        community.communitySettings[community.id].secondaryBannerFormat,
      mobileBannerImg:
        community.communitySettings[community.id].mobileBannerImg,
    };
    const data = await dispatch(updateSettingsBanner(payload));
    dispatch(getCommunitySettings(community.id));
    dispatch(getCommunities());
  };

  const changeBannerImg = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`/api/communities/${community.id}/banner_img`, {
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
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      height
    );

    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      community.communitySettings[community.id].customBannerColor
        ? bannerColor
        : community.communitySettings[community.id].baseColor
    );
  }, [height, bannerColor]);

  return (
    <div className="preview-community-color-theme">
      <h1>Banner</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Height</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <BannerHeight
              height={height}
              option={option}
              activeRadio={activeRadio}
              setActiveRadio={setActiveRadio}
            />
          ))}
        </div>
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Background</h2>
        <PreviewCommunityBannerColor
          theme={bannerColor}
          setTheme={setBannerColor}
          community={community}
          name="Color"
        />
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>
          <DropBox
            dropboxType="banner_img"
            community={community}
            setImage={setImage}
            startingImage={community.communitySettings[community.id].bannerImg}
            preview={preview}
            setPreview={setPreview}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-btns">
        <button
          className="blue-btn-filled btn-long"
          onClick={() => {
            setOpenAppearance(false);
            handleBanner();
          }}
        >
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
