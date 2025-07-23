import { useEffect, useState, MouseEvent } from "react";
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
  );
  const communityId = getIdFromName(communityName, communities);
  const community = communities[communityId];

  /* ---------- local state ---------- */
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  /* ---------- handlers ---------- */
  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };
  const toggleZoom = () => setIsZoomed((z) => !z);

  /* ---------- fetch communities once ---------- */
  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
  }, [dispatch]);

  /* ---------- <head> settings ---------- */
  usePageSettings({
    documentTitle: community?.displayName,
    icon: community ? (
      <CommunityImg
        imgStyle={{
          backgroundColor: community.communitySettings[community.id].baseColor,
        }}
        imgSrc={community.communitySettings[community.id].communityIcon}
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
      `c/${community.name}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
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
      {/* {loading && <div className="loader">Loading...</div>} */}

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
