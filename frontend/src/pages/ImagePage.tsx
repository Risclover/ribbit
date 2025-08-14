import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getCommunities,
} from "@/store";
import { usePageSettings, useDarkMode } from "@/hooks";
import { CommunityImg } from "@/components";
import { getIdFromName } from "@/utils/getCommunityIdFromName";

import "./ImagePage.css";

/* ---------- route-param typing ---------- */
interface RouteParams {
  communityName?: string;
}

/* ---------- store data typing (matches your shape) ---------- */
interface CommunitySettings {
  baseColor?: string;
  communityIcon?: string;
  // (rest of fields exist but we only need these two here)
}

interface Community {
  id: number;
  name: string;
  displayName?: string;
  communitySettings?: Record<number, CommunitySettings>;
}

/* ---------- helper to reliably resolve a community ---------- */
function useCommunityByRouteName(
  communityName: string | undefined,
  communities: Record<number, Community> | undefined
) {
  return useMemo(() => {
    if (!communities || !communityName) return undefined;

    // Try your helper first
    const idFromHelper = getIdFromName(communityName, communities as any);
    if (idFromHelper != null && communities[idFromHelper]) {
      return communities[idFromHelper];
    }

    // Fallback: case-insensitive name match
    const lower = communityName.toLowerCase();
    return Object.values(communities).find(
      (c) => c?.name?.toLowerCase() === lower
    );
  }, [communityName, communities]);
}

export const ImagePage = (): JSX.Element => {
  const { theme } = useDarkMode();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { communityName } = useParams<RouteParams>();

  /* ---------- query-string ---------- */
  const url = new URLSearchParams(location.search).get("url");

  /* ---------- store ---------- */
  const communities = useAppSelector(
    (s: RootState) => s.communities.communities
  ) as Record<number, Community> | undefined;

  const communitiesLoaded = useAppSelector(
    (s: RootState) => s.communities.loaded
  );

  const community = useCommunityByRouteName(communityName, communities);
  const settings: CommunitySettings | undefined =
    community?.communitySettings?.[community?.id ?? -1];

  /* ---------- local state ---------- */
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* ---------- fetch communities once/when needed ---------- */
  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
  }, [communitiesLoaded, dispatch]);

  /* ---------- handlers ---------- */
  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };
  const toggleZoom = () => setIsZoomed((z) => !z);

  usePageSettings({
    documentTitle: community?.displayName,
    icon:
      community && settings ? (
        <CommunityImg
          imgStyle={{
            backgroundColor: settings?.baseColor,
          }}
          imgSrc={settings?.communityIcon}
          imgClass="nav-left-dropdown-item-icon item-icon-circle"
          imgAlt="Community"
        />
      ) : (
        <Skeleton
          variant="circular"
          animation="wave"
          width={20}
          height={20}
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
    pageTitle: community ? (
      `c/${community?.name}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
    refreshKey: community?.id ?? "skeleton",
  });

  /* ---------- early-out ---------- */
  if (!url) {
    return (
      <div className="media-error">
        <h2>No Image URL Provided</h2>
        <p>Please provide a valid image URL.</p>
      </div>
    );
  }

  /* ---------- render ---------- */
  return (
    <div className={`media-container ${isZoomed ? "zoomed" : ""}`}>
      {!error ? (
        <img
          src={url}
          alt="Media Content"
          className={`media-image ${isZoomed ? "zoomed-image" : "small-image"}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={toggleZoom}
          style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
        />
      ) : (
        <div className="media-error">
          <h2>Failed to Load Image</h2>
          <p>The image could not be loaded. Please try a different URL.</p>
        </div>
      )}
    </div>
  );
};
