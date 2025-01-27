// src/features/CommunitySettings/components/PreviewCommunitySidebarAppearance.jsx
import React from "react";
import {
  PreviewCommunityColorTheme,
  PreviewCommunityNameIcon,
  PreviewCommunityBanner,
} from "@/features";

export function PreviewCommunitySidebarAppearance({
  appearanceSidebar,
  setOpenAppearance,
  setAppearanceSidebar,
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
      {/* "Menu" and "Posts" would go here if needed */}
    </div>
  );
}
