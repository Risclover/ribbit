import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import {
  getCommunitySettings,
  getSingleCommunity,
  getCommunities,
  resetToDefault,
  updateSettingsBanner,
  updateSettingsColorTheme,
  updateSettingsNameIcon,
} from "@/store";

// If your default color values belong in a config, move them there. Otherwise, keep inline.
const DEFAULT_BASE_COLOR = "#33a8ff";
const DEFAULT_HIGHLIGHT = "#0079d3";
const DEFAULT_BG_COLOR = "#f5f5f5";
const DEFAULT_BANNER_HEIGHT = "80px";
const DEFAULT_BANNER_COLOR = "#33a8ff";

export function useCommunitySettingsState(community) {
  const dispatch = useAppDispatch();

  // Safely extract the communitySettings object
  const communitySettings = community?.communitySettings?.[community?.id] || {};

  // -------------------------------------------------------------------------
  // LOCAL STATE
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // RE-SYNC FROM STORE ANY TIME communitySettings UPDATES
  // (Important for "deleted" images or other external changes)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!community?.communitySettings?.[community.id]) return;

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

  // -------------------------------------------------------------------------
  // LIVE PREVIEW EFFECT: Update CSS variables whenever local states change
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Colors
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
    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      bannerHeight
    );
    const effectiveBannerColor = customBannerColor ? bannerColor : base;
    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      effectiveBannerColor
    );

    // Banner image
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

  // -------------------------------------------------------------------------
  // ACTIONS: Updating settings & re-fetching
  // -------------------------------------------------------------------------

  const handleResetToDefault = async () => {
    if (!community?.id) return;
    await dispatch(resetToDefault(community.id));
    // Re-fetch final settings
    await dispatch(getCommunitySettings(community.id));
    // If needed, also update the communities list
    // await dispatch(getCommunities());
  };

  /**
   * Upload & update color theme
   */
  const saveColorTheme = async (fileToUpload) => {
    if (!community?.id) return;

    // 1. Upload file if present
    if (fileToUpload) {
      await uploadBgImage(fileToUpload);
    }

    // 2. Update DB
    const payload = {
      settingsId: communitySettings.id,
      baseColor: base,
      highlight,
      bgColor,
      backgroundImgFormat,
      backgroundImg,
    };
    const result = await dispatch(updateSettingsColorTheme(payload));

    // 3. Re-fetch final data
    if (result.ok) {
      await dispatch(getCommunitySettings(community.id));
      // If needed: await dispatch(getCommunities());
    }
  };

  /**
   * Upload background image only
   */
  const uploadBgImage = async (file) => {
    if (!community?.id) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/communities/${community.id}/bg_img`, {
      method: "POST",
      body: formData,
    });
    // We can re-fetch here or wait until after we do the final update
    if (res.ok) {
      // do nothing here, or if needed: await dispatch(getCommunitySettings(community.id));
    }
  };

  /**
   * Upload & update banner
   */
  const saveBanner = async (fileToUpload) => {
    if (!community?.id) return;

    if (fileToUpload) {
      await uploadBannerImg(fileToUpload);
    }

    const payload = {
      settingsId: communitySettings.id,
      bannerHeight,
      bannerColor,
      customBannerColor,
      bannerImg,
      bannerImgFormat,
      secondaryBannerImg: communitySettings.secondaryBannerImg,
      hoverBannerImg: communitySettings.hoverBannerImg,
      secondaryBannerFormat: communitySettings.secondaryBannerFormat,
      mobileBannerImg: communitySettings.mobileBannerImg,
    };
    await dispatch(updateSettingsBanner(payload));
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
      await res.json(); // If your endpoint returns new info, handle it or do nothing
    }
  };

  /**
   * Upload & update name/icon
   */
  const saveNameIcon = async (fileToUpload) => {
    if (!community?.id) return;

    if (fileToUpload) {
      await uploadCommunityIcon(fileToUpload);
    }

    const payload = {
      settingsId: communitySettings.id,
      nameFormat,
      communityIcon,
      hideCommunityIcon,
    };
    const result = await dispatch(updateSettingsNameIcon(payload));
    if (result.ok) {
      await dispatch(getCommunitySettings(community.id));
      // If you need the entire community list: await dispatch(getCommunities());
    }
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
      // If needed: await dispatch(getCommunities()) or getCommunitySettings().
      await res.json();
    }
  };

  // -------------------------------------------------------------------------
  // Return states and actions
  // -------------------------------------------------------------------------
  return {
    // Local states & their setters
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
    communitySettings,

    // Actions
    handleResetToDefault,
    saveColorTheme,
    saveBanner,
    saveNameIcon,
    uploadCommunityIcon,
  };
}
