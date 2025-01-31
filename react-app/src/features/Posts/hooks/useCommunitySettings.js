import { useEffect, useState } from "react";
import {
  getCommunityThemes,
  setCommunityThemes,
} from "@/features/Communities/utils/localStorage";

export const useCommunitySettings = (community) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (community?.id) {
      const themes = getCommunityThemes();
      if (themes.hasOwnProperty(community.id)) {
        setChecked(themes[community.id]);
      } else {
        // If no setting exists for this community, default to true and save it
        themes[community.id] = true;
        setCommunityThemes(themes);
        setChecked(true);
      }
    }
  }, [community]);

  useEffect(() => {
    if (community?.id) {
      const themes = getCommunityThemes();
      themes[community.id] = checked;
      setCommunityThemes(themes);
    }
  }, [checked, community]);

  useEffect(() => {
    if (checked) {
      document.documentElement.style.setProperty(
        "--community-base-color",
        community?.communitySettings[community?.id]?.baseColor
      );

      document.documentElement.style.setProperty(
        "--community-highlight",
        community?.communitySettings[community?.id]?.highlight
      );

      document.documentElement.style.setProperty(
        "--community-body-bg",
        community?.communitySettings[community?.id]?.bgColor
      );

      document.documentElement.style.setProperty(
        "--community-banner-height",
        community?.communitySettings[community?.id]?.bannerHeight
      );

      document.documentElement.style.setProperty(
        "--community-banner-color",
        community?.communitySettings[community?.id]?.customBannerColor
          ? community?.communitySettings[community?.id]?.bannerColor
          : community?.communitySettings[community?.id]?.baseColor
      );

      document.documentElement.style.setProperty(
        "--community-banner-img",
        `url("${
          community?.communitySettings[community?.id]?.bannerImg
        }") no-repeat center / cover`
      );

      if (
        community?.communitySettings[community?.id]?.backgroundImgFormat ===
        "fill"
      ) {
        document.documentElement.style.setProperty(
          "--community-body-bg-img",
          `${community?.communitySettings[community?.id]?.bgColor} url(${
            community?.communitySettings[community?.id]?.backgroundImg
          }) no-repeat center / cover`
        );
      } else if (
        community?.communitySettings[community?.id]?.backgroundImgFormat ===
        "tile"
      ) {
        document.documentElement.style.setProperty(
          "--community-body-bg-img",
          `${community?.communitySettings[community?.id]?.bgColor} url(${
            community?.communitySettings[community?.id]?.backgroundImg
          }) repeat center top`
        );
      } else if (
        community?.communitySettings[community?.id]?.backgroundImgFormat ===
        "center"
      ) {
        document.documentElement.style.setProperty(
          "--community-body-bg-img",
          `${community?.communitySettings[community?.id]?.bgColor} url(${
            community?.communitySettings[community?.id]?.backgroundImg
          }) no-repeat center top`
        );
      }
    } else if (!checked) {
      document.documentElement.style.setProperty(
        "--community-base-color",
        "var(--highlight-color)"
      );

      document.documentElement.style.setProperty(
        "--community-highlight",
        "var(--highlight-color)"
      );

      document.documentElement.style.setProperty(
        "--community-base-color-text",
        "white"
      );

      document.documentElement.style.setProperty(
        "--community-body-bg",
        "#dae0e6"
      );

      document.documentElement.style.setProperty(
        "--community-banner-height",
        "80px"
      );

      document.documentElement.style.setProperty(
        "--community-banner-color",
        "#33a8ff"
      );

      document.documentElement.style.setProperty("--community-banner-img", "");

      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        "#dae0e6"
      );
    }
  }, [checked, community]);

  return { checked, setChecked };
};
