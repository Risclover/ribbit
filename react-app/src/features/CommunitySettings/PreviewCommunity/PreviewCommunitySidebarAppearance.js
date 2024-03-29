import React from "react";
import {
  PreviewCommunityColorTheme,
  PreviewCommunityNameIcon,
  PreviewCommunityBanner,
} from "../..";

export function PreviewCommunitySidebarAppearance({
  community,
  appearanceSidebar,
  setOpenAppearance,
  base,
  setBase,
  highlight,
  setHighlight,
  bodyBg,
  setBodyBg,
  backgroundImg,
  setBackgroundImg,
  nameFormat,
  setNameFormat,
  backgroundImgFormat,
  setBackgroundImgFormat,
  bannerHeight,
  setBannerHeight,
  bannerHeight2,
  setBannerHeight2,
  bannerColor,
  setBannerColor,
  customBannerColor,
  setCustomBannerColor,
  bannerImg,
  setBannerImg,
  bannerImgFormat,
  setBannerImgFormat,
  communityIcon,
  setCommunityIcon,
  hideCommunityIcon,
  setHideCommunityIcon,
}) {
  return (
    <div>
      {appearanceSidebar === "Color theme" && (
        <PreviewCommunityColorTheme
          setOpenAppearance={setOpenAppearance}
          community={community}
          base={base}
          setBase={setBase}
          highlight={highlight}
          setHighlight={setHighlight}
          bodyBg={bodyBg}
          setBodyBg={setBodyBg}
          bodyBgPreview={backgroundImg}
          setBodyBgPreview={setBackgroundImg}
          bgFormat={backgroundImgFormat}
          setBgFormat={setBackgroundImgFormat}
        />
      )}
      {appearanceSidebar === "Name & icon" && (
        <PreviewCommunityNameIcon
          setOpenAppearance={setOpenAppearance}
          community={community}
          activeRadio={nameFormat}
          setActiveRadio={setNameFormat}
          communityIcon={communityIcon}
          setCommunityIcon={setCommunityIcon}
          checked={hideCommunityIcon}
          setChecked={setHideCommunityIcon}
        />
      )}
      {appearanceSidebar === "Banner" && (
        <PreviewCommunityBanner
          setOpenAppearance={setOpenAppearance}
          community={community}
          height={bannerHeight}
          setHeight={setBannerHeight}
          activeRadio={bannerHeight2}
          setActiveRadio={setBannerHeight2}
          bannerColor={bannerColor}
          setBannerColor={setBannerColor}
          customBannerColor={customBannerColor}
          setCustomBannerColor={setCustomBannerColor}
          bannerImg={bannerImg}
          setBannerImg={setBannerImg}
          bannerImgFormat={bannerImgFormat}
          setBannerImgFormat={setBannerImgFormat}
        />
      )}
    </div>
  );
}
