import React from "react";
import PreviewCommunityColorTheme from "./PreviewCommunityColorTheme";

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
    </div>
  );
}
