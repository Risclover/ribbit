import React, { useEffect, useState } from "react";
import BannerHeight from "./BannerHeight";
import { useDispatch } from "react-redux";
import {
  getCommunitySettings,
  updateSettingsBanner,
} from "../../../../store/community_settings";
import { getSingleCommunity } from "../../../../store/one_community";
import PreviewCommunityColorThemeColor from "./PreviewCommunityColorThemeColor";
import PreviewCommunityBannerColor from "./PreviewCommunityBannerColor";
import { getCommunities } from "../../../../store/communities";

export default function PreviewCommunityBanner({
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
}) {
  const dispatch = useDispatch();

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
    const payload = {
      settingsId: community.communitySettings[community.id].id,
      bannerHeight: height,
      bannerColor: bannerColor,
      customBannerColor: customBannerColor,
      bannerImg: community.communitySettings[community.id].bannerImg,
      bannerImgFormat:
        community.communitySettings[community.id].bannerImgFormat,
      secondaryBannerImg:
        community.communitySettings[community.id].secondaryBannerImg,
      hoverBannerImg: community.communitySettings[community.id].hoverBannerImg,
      secondaryBannerFormat:
        community.communitySettings[community.id].secondaryBannerFormat,
      mobileBannerImg:
        community.communitySettings[community.id].mobileBannerImg,
    };
    console.log("payload:", payload);
    const data = await dispatch(updateSettingsBanner(payload));
    console.log("data:", data);
    dispatch(getCommunitySettings(community.id));
    dispatch(getCommunities());
    setOpenAppearance(false);
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

          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleBanner}>
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
