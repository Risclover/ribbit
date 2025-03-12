// src/components/MediaPage.js

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ImagePage.css"; // Import the CSS file for styling
import { getIdFromName } from "@/utils/getCommunityIdFromName";
import { useDispatch, useSelector } from "react-redux";
import { usePageSettings } from "@/hooks";
import { CommunityImg } from "@/components";
import Skeleton from "@mui/material/Skeleton";
import { getCommunities } from "@/store";
import { useDarkMode } from "hooks";

export const ImagePage = () => {
  const { theme } = useDarkMode();

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get("url");
  const { communityName } = useParams();
  const communities = useSelector((state) => state.communities);

  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const communityId = getIdFromName(communityName, communities);
  const community = communities[communityId];

  if (!url) {
    return (
      <div>
        <div className="media-error">
          <h2>No Image URL Provided</h2>
          <p>Please provide a valid image URL.</p>
        </div>
      </div>
    );
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  const toggleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom);
  };

  useEffect(() => {
    dispatch(getCommunities());
  }, []);

  usePageSettings({
    documentTitle: community?.displayName,
    icon:
      community !== undefined ? (
        <CommunityImg
          imgStyle={{
            backgroundColor: `${
              community?.communitySettings[community?.id]?.baseColor
            }`,
          }}
          imgSrc={community?.communitySettings[community?.id]?.communityIcon}
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
    pageTitle:
      community !== undefined ? (
        `c/${community?.name}`
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
  });

  return (
    <div>
      <div className={`media-container ${isZoomed ? "zoomed" : ""}`}>
        {loading && <div className="loader">Loading...</div>}
        {!error ? (
          <img
            src={url}
            alt="Media Content"
            className={`media-image ${
              isZoomed ? "zoomed-image" : "small-image"
            }`}
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
    </div>
  );
};
