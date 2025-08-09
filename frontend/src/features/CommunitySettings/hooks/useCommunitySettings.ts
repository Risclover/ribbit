import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  getCommunityThemes,
  setCommunityThemes,
} from "@/features/Communities/utils/localStorage";
import { useDarkMode } from "@/hooks";

/** Helpers to compute CSS values from settings */
function bgImgValue(s: any) {
  if (!s?.backgroundImg) return s?.bgColor ?? "#dae0e6";
  const url = `url(${s.backgroundImg})`;
  switch (s.backgroundImgFormat) {
    case "tile":
      return `${s.bgColor} ${url} repeat center top`;
    case "center":
      return `${s.bgColor} ${url} no-repeat center top`;
    case "fill":
    default:
      return `${s.bgColor} ${url} no-repeat center / cover`;
  }
}
function bannerValue(s: any) {
  const base = s?.customBannerColor ? s.bannerColor : s?.baseColor;
  return s?.bannerImg
    ? `${base} url("${s.bannerImg}") no-repeat center / cover`
    : base ?? "#33a8ff";
}

export const useCommunitySettings = (community: any) => {
  const { theme } = useDarkMode();
  const id = community?.id;
  const settings = id ? community?.communitySettings?.[id] : undefined;

  /** 1) Read toggle from localStorage synchronously */
  const initialChecked = useMemo(() => {
    if (!id) return false;
    const themes = getCommunityThemes();
    if (Object.prototype.hasOwnProperty.call(themes, id)) {
      return !!themes[id];
    }
    // default ON per your current behavior
    themes[id] = true;
    setCommunityThemes(themes);
    return true;
  }, [id]);

  const [checked, setChecked] = useState(initialChecked);

  /** Keep state in sync if the community id changes */
  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  /** Persist toggle when user changes it */
  useEffect(() => {
    if (!id) return;
    const themes = getCommunityThemes();
    themes[id] = checked;
    setCommunityThemes(themes);
  }, [id, checked]);

  /**
   * 2) Write CSS variables in a layout effect (before paint).
   * 3) If checked is true but settings are not ready yet, do nothing
   *    so the previous theme stays visible (no default flash).
   *    Only set defaults when the user explicitly turned themes off.
   */
  useLayoutEffect(() => {
    const root = document.documentElement.style;
    if (!id) return;

    if (checked) {
      if (!settings) return; // keep previous vars until we have data

      root.setProperty(
        "--community-base-color",
        settings.baseColor ?? "#0079d3"
      );
      root.setProperty(
        "--community-highlight",
        settings.highlight ?? "var(--highlight-color)"
      );
      root.setProperty("--community-body-bg", settings.bgColor ?? "#dae0e6");
      root.setProperty(
        "--community-banner-height",
        settings.bannerHeight ?? "80px"
      );
      root.setProperty(
        "--community-banner-color",
        settings.customBannerColor
          ? settings.bannerColor ?? settings.baseColor
          : settings.baseColor ?? "#33a8ff"
      );
      root.setProperty("--community-banner-img", bannerValue(settings));
      root.setProperty("--community-body-bg-img", bgImgValue(settings));
      return;
    }

    // Themes OFF (user choice): set your app defaults once.
    // (These are the same values you already used.)
    const defaultBase =
      theme === "light" ? "var(--highlight-color)" : "#0079d3";
    root.setProperty("--community-base-color", defaultBase);
    root.setProperty("--community-highlight", "var(--highlight-color)");
    root.setProperty("--community-base-color-text", "white");
    root.setProperty("--community-body-bg", "#dae0e6");
    root.setProperty("--community-banner-height", "80px");
    root.setProperty("--community-banner-color", "#33a8ff");
    root.setProperty("--community-banner-img", "#0079d3");
    root.setProperty("--community-body-bg-img", "#dae0e6");
  }, [id, checked, settings, theme]);

  return { checked, setChecked };
};
