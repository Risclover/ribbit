import { useEffect, useState } from "react";
import { getCommunities, useAppDispatch } from "@/store";
import {
  getCommunitySettings,
  resetToDefault,
  updateSettingsBanner,
  updateSettingsColorTheme,
  updateSettingsNameIcon,
} from "@/store";

// Defaults
const DEFAULT_BASE_COLOR = "#33a8ff";
const DEFAULT_HIGHLIGHT = "#0079d3";
const DEFAULT_BG_COLOR = "#f5f5f5";
const DEFAULT_BANNER_HEIGHT = "80px";
const DEFAULT_BANNER_COLOR = "#33a8ff";
const DEFAULT_ICON_URL = "https://i.imgur.com/9CI9hiO.png";

export function useCommunitySettingsState(community) {
  const dispatch = useAppDispatch();

  // Safely extract the settings object for this community
  const communitySettings = community?.communitySettings?.[community?.id] || {};

  // ---------------- Local state ----------------
  const [base, setBase] = useState(
    communitySettings.baseColor || DEFAULT_BASE_COLOR
  );
  const [highlight, setHighlight] = useState(
    communitySettings.highlight || DEFAULT_HIGHLIGHT
  );
  const [bgColor, setBgColor] = useState(
    communitySettings.bgColor || DEFAULT_BG_COLOR
  );
  const [backgroundImg, setBackgroundImg] = useState(
    communitySettings.backgroundImg || ""
  );
  const [backgroundImgFormat, setBackgroundImgFormat] = useState(
    communitySettings.backgroundImgFormat || "fill"
  );

  const [bannerHeight, setBannerHeight] = useState(
    communitySettings.bannerHeight || DEFAULT_BANNER_HEIGHT
  );
  const [bannerColor, setBannerColor] = useState(
    communitySettings.bannerColor || DEFAULT_BANNER_COLOR
  );
  const [customBannerColor, setCustomBannerColor] = useState(
    !!communitySettings.customBannerColor
  );
  const [bannerImg, setBannerImg] = useState(communitySettings.bannerImg || "");
  const [bannerImgFormat, setBannerImgFormat] = useState(
    communitySettings.bannerImgFormat || "fill"
  );

  const [nameFormat, setNameFormat] = useState(
    communitySettings.nameFormat || ""
  );
  const [communityIcon, setCommunityIcon] = useState(
    communitySettings.communityIcon || ""
  );
  const [hideCommunityIcon, setHideCommunityIcon] = useState(
    !!communitySettings.hideCommunityIcon
  );

  // ---------------- Re-sync from store ----------------
  useEffect(() => {
    if (!community?.communitySettings?.[community?.id]) return;

    setBase(communitySettings.baseColor || DEFAULT_BASE_COLOR);
    setHighlight(communitySettings.highlight || DEFAULT_HIGHLIGHT);
    setBgColor(communitySettings.bgColor || DEFAULT_BG_COLOR);
    setBackgroundImg(communitySettings.backgroundImg || "");
    setBackgroundImgFormat(communitySettings.backgroundImgFormat || "fill");

    setBannerHeight(communitySettings.bannerHeight || DEFAULT_BANNER_HEIGHT);
    setBannerColor(communitySettings.bannerColor || DEFAULT_BANNER_COLOR);
    setCustomBannerColor(!!communitySettings.customBannerColor);
    setBannerImg(communitySettings.bannerImg || "");
    setBannerImgFormat(communitySettings.bannerImgFormat || "fill");

    setNameFormat(communitySettings.nameFormat || "");
    setCommunityIcon(communitySettings.communityIcon || "");
    setHideCommunityIcon(!!communitySettings.hideCommunityIcon);
  }, [community, communitySettings]);

  // ---------------- Live preview CSS ----------------
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--preview-community-color-theme-base",
      base
    );
    document.documentElement.style.setProperty(
      "--preview-community-color-theme-highlight",
      highlight
    );
    document.documentElement.style.setProperty(
      "--preview-community-color-theme-bgColor",
      bgColor
    );

    document.documentElement.style.setProperty(
      "--preview-community-name-format",
      nameFormat
    );

    // Body background
    let finalBgImg = bgColor;
    if (backgroundImg) {
      switch (backgroundImgFormat) {
        case "tile":
          finalBgImg += ` url(${backgroundImg}) repeat center top`;
          break;
        case "center":
          finalBgImg += ` url(${backgroundImg}) no-repeat center top`;
          break;
        case "fill":
        default:
          finalBgImg += ` url(${backgroundImg}) no-repeat center / cover`;
          break;
      }
    }
    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img",
      finalBgImg
    );

    // Banner
    const effectiveBannerColor = customBannerColor ? bannerColor : base;
    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      bannerHeight
    );
    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      effectiveBannerColor
    );

    if (bannerImg) {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        `${effectiveBannerColor} url(${bannerImg}) no-repeat center / cover`
      );
    } else {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        effectiveBannerColor
      );
    }
  }, [
    base,
    highlight,
    bgColor,
    backgroundImg,
    backgroundImgFormat,
    bannerHeight,
    bannerColor,
    customBannerColor,
    bannerImg,
    nameFormat,
  ]);

  // ---------------- Helpers: POST image -> S3 URL ----------------
  const postImage = async (endpoint, file) => {
    if (!community?.id || !file) return null;
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(endpoint, {
      method: "POST",
      body: fd,
      credentials: "same-origin",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.url) {
      const msg =
        data?.errors || data?.error || `Upload failed (${res.status})`;
      throw new Error(msg);
    }
    return data.url; // S3 URL
  };

  const uploadBgImage = async (file) => {
    const url = await postImage(
      `/api/communities/${community.id}/bg_img`,
      file
    );
    if (url) setBackgroundImg(url); // swap preview to S3 URL
    return url;
  };

  const uploadBannerImg = async (file) => {
    const url = await postImage(
      `/api/communities/${community.id}/banner_img`,
      file
    );
    if (url) setBannerImg(url);
    return url;
  };

  const uploadCommunityIcon = async (file) => {
    const url = await postImage(`/api/communities/${community.id}/img`, file);
    if (url) setCommunityIcon(url);
    return url;
  };

  // ---------------- Actions: persist settings ----------------
  const handleResetToDefault = async () => {
    if (!community?.id) return;
    await dispatch(resetToDefault(community.id));
    await dispatch(getCommunitySettings(community.id));
  };

  /** Upload (optional) + persist color theme (includes background image URL) */
  const saveColorTheme = async (fileToUpload) => {
    if (!community?.id) return;

    // Upload new background image if provided
    let bgUrl = backgroundImg;
    if (fileToUpload) {
      bgUrl = await uploadBgImage(fileToUpload); // sets state + returns S3 URL
    }

    // Persist settings with final URL
    await dispatch(
      updateSettingsColorTheme({
        settingsId: communitySettings.id,
        baseColor: base,
        highlight,
        bgColor,
        backgroundImgFormat,
        backgroundImg: bgUrl || "", // never undefined
      })
    );

    await dispatch(getCommunitySettings(community.id));
    await dispatch(getCommunities());
  };

  /** Upload (optional) + persist banner (includes banner image URL) */
  const saveBanner = async (fileToUpload) => {
    if (!community?.id) return;

    let bannerUrl = bannerImg;
    if (fileToUpload) {
      bannerUrl = await uploadBannerImg(fileToUpload);
    }

    await dispatch(
      updateSettingsBanner({
        settingsId: communitySettings.id,
        bannerHeight,
        bannerColor,
        customBannerColor,
        bannerImg: bannerUrl || "",
        bannerImgFormat,
        secondaryBannerImg: communitySettings.secondaryBannerImg,
        hoverBannerImg: communitySettings.hoverBannerImg,
        secondaryBannerFormat: communitySettings.secondaryBannerFormat,
        mobileBannerImg: communitySettings.mobileBannerImg,
      })
    );

    await dispatch(getCommunitySettings(community.id));
    await dispatch(getCommunities());
  };

  /** Upload (optional) + persist name/icon */
  const saveNameIcon = async (fileToUpload) => {
    if (!community?.id) return;

    let iconUrl = communityIcon || communitySettings.communityIcon || "";
    if (fileToUpload) {
      iconUrl = await uploadCommunityIcon(fileToUpload); // sets state + returns S3 URL
    }
    if (iconUrl === "") iconUrl = DEFAULT_ICON_URL; // policy: reset to default if cleared

    await dispatch(
      updateSettingsNameIcon({
        settingsId: communitySettings.id,
        nameFormat,
        communityIcon: iconUrl,
        hideCommunityIcon,
      })
    );

    await dispatch(getCommunitySettings(community.id));
    await dispatch(getCommunities());
  };

  // ---------------- Expose API ----------------
  return {
    // state + setters
    base,
    setBase,
    highlight,
    setHighlight,
    bgColor,
    setBgColor,
    backgroundImg,
    setBackgroundImg,
    backgroundImgFormat,
    setBackgroundImgFormat,
    bannerHeight,
    setBannerHeight,
    bannerColor,
    setBannerColor,
    customBannerColor,
    setCustomBannerColor,
    bannerImg,
    setBannerImg,
    bannerImgFormat,
    setBannerImgFormat,
    nameFormat,
    setNameFormat,
    communityIcon,
    setCommunityIcon,
    hideCommunityIcon,
    setHideCommunityIcon,

    // originals
    community,
    communitySettings,

    // actions
    handleResetToDefault,
    saveColorTheme,
    saveBanner,
    saveNameIcon,
    uploadCommunityIcon, // still available if you want instant upload on pick
    uploadBgImage, // exposed in case you need it
    uploadBannerImg, // exposed in case you need it
  };
}
