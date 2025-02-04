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

  // Safely extract the communitySettings object
  const communitySetting = community?.communitySettings?.[community?.id] || {};

  // ---------------
  // Local states
  // ---------------
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

  // --------------------------------------------------------------------------------
  // Re-SYNC local states whenever the Redux store updates (important for "deletions")
  // --------------------------------------------------------------------------------
  useEffect(() => {
    // If there's no communitySettings for this community, do nothing.
    if (!community?.communitySettings?.[community.id]) return;

    setBase(communitySetting.baseColor || "#33a8ff");
    setHighlight(communitySetting.highlight || "#0079d3");
    setBgColor(communitySetting.bgColor || "#f5f5f5");
    setBackgroundImg(communitySetting.backgroundImg || "");
    setBackgroundImgFormat(communitySetting.backgroundImgFormat || "fill");

    setBannerHeight(communitySetting.bannerHeight || "80px");
    setBannerColor(communitySetting.bannerColor || "#33a8ff");
    setCustomBannerColor(!!communitySetting.customBannerColor);
    setBannerImg(communitySetting.bannerImg || "");
    setBannerImgFormat(communitySetting.bannerImgFormat || "fill");

    setNameFormat(communitySetting.nameFormat || "");
    setCommunityIcon(communitySetting.communityIcon || "");
    setHideCommunityIcon(!!communitySetting.hideCommunityIcon);
  }, [community, communitySetting]);

  // --------------------------------------------------------------------------------
  // Whenever local states change, update CSS variables in real-time for live preview
  // --------------------------------------------------------------------------------
  useEffect(() => {
    // Base/highlight/bgColor
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

    // Name format
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
        finalBgImg
      );
    } else {
      // If no image, just set the bg color
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        bgColor
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

    // Banner image
    if (bannerImg) {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        `${bannerColor} url(${bannerImg}) no-repeat center / cover`
      );
    } else {
      document.documentElement.style.setProperty(
        "--preview-community-banner-img",
        bannerColor
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

  // --------------------------------------------------------------------------------
  // Dispatch actions to the server, then re-fetch from Redux
  // --------------------------------------------------------------------------------
  const handleResetToDefault = async () => {
    if (!community?.id) return;
    await dispatch(resetToDefault(community.id));
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  };

  const saveColorTheme = async (imgFile) => {
    if (!community?.id) return;

    // 1. If there's a new file, upload it
    if (imgFile) {
      await uploadBgImage(imgFile);
      // That uploadBgImage function can do its own "dispatch(getCommunitySettings())"
      // if it wants, but prefer to handle everything after all logic is done.
    }

    // 2. Dispatch the final update with the correct backgroundImg
    const payload = {
      settingsId: communitySetting.id,
      baseColor: base,
      highlight,
      bgColor,
      backgroundImgFormat,
      backgroundImg, // = '' if user deleted it
    };

    const updateResult = await dispatch(updateSettingsColorTheme(payload));
    if (updateResult.ok) {
      // 3. Now fetch the updated settings once, to have the final state
      await dispatch(getCommunitySettings(community.id));
    }

    // 4. You generally do NOT need getCommunities() if you only want the updated settings
    // If you do need it, consider calling it after the settings are fully updated:
    // await dispatch(getCommunities());
  };

  const uploadBgImage = async (file) => {
    if (!community?.id) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/communities/${community.id}/bg_img`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // We can do a quick re-fetch here if we want to see the new image path,
      // but it might be better to wait until after we do `updateSettingsColorTheme`.
      // This is up to you:
      // await dispatch(getCommunitySettings(community.id));
    }
  };

  const saveBanner = async (imgFile) => {
    if (!community?.id) return;

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
      secondaryBannerImg: communitySetting.secondaryBannerImg,
      hoverBannerImg: communitySetting.hoverBannerImg,
      secondaryBannerFormat: communitySetting.secondaryBannerFormat,
      mobileBannerImg: communitySetting.mobileBannerImg,
    };
    await dispatch(updateSettingsBanner(payload));
    dispatch(getCommunitySettings(community.id));
    dispatch(getCommunities());
  };

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

  const saveNameIcon = async (iconFile) => {
    if (!community?.id) return;

    if (iconFile) {
      await uploadCommunityIcon(iconFile);
    }

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

  // -------------------------
  // Return states and actions
  // -------------------------
  return {
    // Local states & setters
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

    // Original community & settings
    community,
    communitySetting,

    // Actions
    uploadCommunityIcon,
    handleResetToDefault,
    saveColorTheme,
    saveBanner,
    saveNameIcon,
  };
}
