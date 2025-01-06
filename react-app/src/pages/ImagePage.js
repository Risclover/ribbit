// src/components/MediaPage.js

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ImagePage.css"; // Import the CSS file for styling

const ImagePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get("url");
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

export default ImagePage;
