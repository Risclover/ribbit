const LOAD_SETTINGS = "community_settings/LOAD_SETTINGS";
const LOAD_SETTING = "community_settings/LOAD_SETTING";

export const loadSettings = (settings) => {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
};

export const loadSetting = (setting) => {
  return {
    type: LOAD_SETTING,
    setting,
  };
};

export const getCommunitySettings = (communityId) => async (dispatch) => {
  const response = await fetch(
    `/api/community_settings/communities/${communityId}`
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSettings(data));
    return data;
  }
};

export const updateSettingsColorTheme = (payload) => async (dispatch) => {
  const {
    settingsId,
    baseColor,
    highlight,
    bgColor,
    backgroundImg,
    backgroundImgFormat,
  } = payload;

  const response = await fetch(
    `/api/community_settings/${settingsId}/color-theme/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseColor,
        highlight,
        bgColor,
        backgroundImg,
        backgroundImgFormat,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSetting(data));
    return data;
  }
};

export const updateSettingsNameIcon = (payload) => async (dispatch) => {
  const { settingsId, nameFormat, hideCommunityIcon, communityIcon } = payload;

  const response = await fetch(
    `/api/community_settings/${settingsId}/name-and-icon/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameFormat,
        hideCommunityIcon,
        communityIcon,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSetting(data));
    return data;
  }
};

export const updateSettingsBanner = (payload) => async (dispatch) => {
  const {
    settingsId,
    bannerHeight,
    bannerColor,
    bannerImg,
    bannerImgFormat,
    secondaryBannerImg,
    hoverBannerImg,
    secondaryBannerFormat,
    mobileBannerImg,
  } = payload;

  const response = await fetch(
    `/api/community_settings/${settingsId}/banner/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bannerHeight,
        bannerColor,
        bannerImg,
        bannerImgFormat,
        secondaryBannerImg,
        hoverBannerImg,
        secondaryBannerFormat,
        mobileBannerImg,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSetting(data));
    return data;
  }
};

export const updateSettingsMenu = (payload) => async (dispatch) => {
  const {
    settingsId,
    activeLinkColor,
    inactiveLinkColor,
    hoverLinkColor,
    menuBgColor,
    submenuBgColor,
  } = payload;

  const response = await fetch(
    `/api/community_settings/${settingsId}/menu/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activeLinkColor,
        inactiveLinkColor,
        hoverLinkColor,
        menuBgColor,
        submenuBgColor,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSetting(data));
    return data;
  }
};

export const updateSettingsPosts = (payload) => async (dispatch) => {
  const {
    settingsId,
    postTitleColor,
    upvoteImgActive,
    upvoteImgInactive,
    downvoteImgActive,
    downvoteImgInactive,
    upvoteCountColor,
    downvoteCountColor,
    postBgColor,
    postBgImg,
    postBgImgFormat,
    linkPlaceholderImg,
    linkPlaceholderImgFormat,
  } = payload;

  const response = await fetch(
    `/api/community_settings/${settingsId}/posts/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postTitleColor,
        upvoteImgActive,
        upvoteImgInactive,
        downvoteImgActive,
        downvoteImgInactive,
        upvoteCountColor,
        downvoteCountColor,
        postBgColor,
        postBgImg,
        postBgImgFormat,
        linkPlaceholderImg,
        linkPlaceholderImgFormat,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSetting(data));
    return data;
  }
};

export const resetToDefault = (settingsId) => async (dispatch) => {
  const response = await fetch(`/api/community_settings/${settingsId}/reset`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const initialState = {};

export default function communitySettingsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SETTINGS:
      return action.settings.Settings.reduce((settings, setting) => {
        settings[setting.id] = setting;
        return settings;
      }, {});
    case LOAD_SETTING:
      return {
        [action.setting.id]: { ...action.setting },
      };
    default:
      return state;
  }
}
