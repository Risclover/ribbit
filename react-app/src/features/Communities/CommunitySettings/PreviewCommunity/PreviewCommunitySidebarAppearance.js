import React from "react";
import PreviewCommunityColorTheme from "./PreviewCommunityColorTheme";
import PreviewCommunityNameIcon from "./PreviewCommunityNameIcon";
import PreviewCommunityBanner from "./PreviewCommunityBanner";

export default function PreviewCommunitySidebarAppearance({
  community,
  appearanceSidebar,
  setOpenAppearance,
}) {
  return (
    <div>
      {appearanceSidebar === "Color theme" && (
        <PreviewCommunityColorTheme
          setOpenAppearance={setOpenAppearance}
          community={community}
        />
      )}
      {appearanceSidebar === "Name & icon" && (
        <PreviewCommunityNameIcon
          setOpenAppearance={setOpenAppearance}
          community={community}
        />
      )}
      {appearanceSidebar === "Banner" && (
        <PreviewCommunityBanner
          setOpenAppearance={setOpenAppearance}
          community={community}
        />
      )}
    </div>
  );
}
