import React from "react";
import {
  PreviewCommunityColorTheme,
  PreviewCommunityNameIcon,
  PreviewCommunityBanner,
} from "@/features";

export function PreviewCommunitySidebarAppearance({
  appearanceSidebar,
  setOpenAppearance,
  settingsState,
}) {
  return (
    <div>
      {appearanceSidebar === "Color theme" && (
        <PreviewCommunityColorTheme
          setOpenAppearance={setOpenAppearance}
          settingsState={settingsState}
        />
      )}
      {appearanceSidebar === "Name & icon" && (
        <PreviewCommunityNameIcon
          setOpenAppearance={setOpenAppearance}
          settingsState={settingsState}
        />
      )}
      {appearanceSidebar === "Banner" && (
        <PreviewCommunityBanner
          setOpenAppearance={setOpenAppearance}
          settingsState={settingsState}
        />
      )}
    </div>
  );
}
