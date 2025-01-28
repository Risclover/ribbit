// src/features/CommunitySettings/hooks/useCommunitySettingsState.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCommunitySettings,
  getSingleCommunity,
  getCommunities,
  resetToDefault,
  updateSettingsBanner,
  updateSettingsColorTheme,
  updateSettingsNameIcon,
} from "@/store";

export function useCommunitySettingsState(community) {
  const dispatch = useDispatch();

  // Safely extract the communitySettings object for this community
  const communitySetting = community?.communitySettings?.[community?.id] || {};

  // Local states
  const [base, setBase] = useState(communitySetting.baseColor || "#33a8ff");
  const [highlight, setHighlight] = useState(
    communitySetting.highlight || "#0079d3"
  );
  const [bgColor, setBgColor] = useState(communitySetting.bgColor || "#f5f5f5");
  const [backgroundImg, setBackgroundImg] = useState(
    communitySetting.backgroundImg || ""
  );
  const [backgroundImgFormat, setBackgroundImgFormat] = useState(
    communitySetting.backgroundImgFormat || "fill"
  );

  const [bannerHeight, setBannerHeight] = useState(
    communitySetting.bannerHeight || "80px"
  );
  const [bannerColor, setBannerColor] = useState(
    communitySetting.bannerColor || "#33a8ff"
  );
  const [customBannerColor, setCustomBannerColor] = useState(
    !!communitySetting.customBannerColor
  );
  const [bannerImg, setBannerImg] = useState(communitySetting.bannerImg || "");
  const [bannerImgFormat, setBannerImgFormat] = useState(
    communitySetting.bannerImgFormat || "fill"
  );

  const [nameFormat, setNameFormat] = useState(
    communitySetting.nameFormat || ""
  );
  const [communityIcon, setCommunityIcon] = useState(
    communitySetting.communityIcon || ""
  );
  const [hideCommunityIcon, setHideCommunityIcon] = useState(
    !!communitySetting.hideCommunityIcon
  );

  /**
   * Whenever our local states change, we update CSS variables in real-time
   * so we get a live preview.
   */
  useEffect(() => {
    document.documentElement.style.setProperty;
    // Color theme variables
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
    let finalBgImg = `${bgColor}`;
    if (backgroundImg.length > 0) {
      switch (backgroundImgFormat) {
        case "fill":
          finalBgImg += ` url(${backgroundImg}) no-repeat center / cover`;
          break;
        case "tile":
          finalBgImg += ` url(${backgroundImg}) repeat center top`;
          break;
        case "center":
          finalBgImg += ` url(${backgroundImg}) no-repeat center top`;
          break;
        default:
          finalBgImg += ` url(${backgroundImg}) no-repeat center / cover`;
          break;
      }
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        finalBgImg || ""
      );
    }

    // Banner style variables
    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      bannerHeight
    );
    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      customBannerColor ? bannerColor : base
    );

    if (bannerImg) {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        `${bannerColor} url(${bannerImg}) no-repeat center / cover`
      );
    } else {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        `${bannerColor}`
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
    // name/icon do not affect styles here, so no need to place them
  ]);

  /**
   * Resets to default by dispatching resetToDefault, then re-fetching the community.
   */
  const handleResetToDefault = async () => {
    if (!community?.id) return;
    await dispatch(resetToDefault(community.id));
    // Re-fetch
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  };

  /**
   * Save Color Theme
   */
  const saveColorTheme = async (imgFile) => {
    if (!community?.id) return;
    // If there's an uploaded background image file, handle it
    if (imgFile) {
      await uploadBgImage(imgFile);
    }

    const payload = {
      settingsId: communitySetting.id,
      baseColor: base,
      highlight,
      bgColor,
      backgroundImgFormat,
      backgroundImg,
    };
    await dispatch(updateSettingsColorTheme(payload));
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  };

  /**
   * Helper to upload the background image
   */
  const uploadBgImage = async (file) => {
    if (!community?.id) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/communities/${community.id}/bg_img`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await res.json();
      dispatch(getCommunities());
      dispatch(getCommunitySettings(community.id));
    }
  };

  /**
   * Save Banner
   */
  const saveBanner = async (imgFile) => {
    if (!community?.id) return;
    // If there's an uploaded banner image file, handle it
    if (imgFile) {
      await uploadBannerImg(imgFile);
    }
    const payload = {
      settingsId: communitySetting.id,
      bannerHeight,
      bannerColor,
      customBannerColor,
      bannerImg,
      bannerImgFormat,
      // The below come from existing fields in your code:
      secondaryBannerImg: communitySetting.secondaryBannerImg,
      hoverBannerImg: communitySetting.hoverBannerImg,
      secondaryBannerFormat: communitySetting.secondaryBannerFormat,
      mobileBannerImg: communitySetting.mobileBannerImg,
    };
    await dispatch(updateSettingsBanner(payload));
    dispatch(getCommunitySettings(community.id));
    dispatch(getCommunities());
  };

  /**
   * Helper to upload banner image
   */
  const uploadBannerImg = async (file) => {
    if (!community?.id) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/communities/${community.id}/banner_img`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community.id));
    }
  };

  /**
   * Save Name & Icon
   */
  const saveNameIcon = async (iconFile) => {
    if (!community?.id) return;

    // If there's a custom icon file
    if (iconFile) {
      await uploadCommunityIcon(iconFile);
    }

    // Dispatch settings update
    await dispatch(
      updateSettingsNameIcon({
        settingsId: communitySetting.id,
        nameFormat,
        communityIcon,
        hideCommunityIcon,
      })
    );

    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  };

  /**
   * Helper to upload community icon
   */
  const uploadCommunityIcon = async (file) => {
    if (!community?.id) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/communities/${community.id}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getCommunities());
    }
  };

  return {
    // current local states & their setters
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
    community,
    // actions
    handleResetToDefault,
    saveColorTheme,
    saveBanner,
    saveNameIcon,
  };
}
