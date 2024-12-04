import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

export const RandomLogo = ({ logos }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1070);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1070);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle emotion and image selection
  useEffect(() => {
    const emotions = Object.keys(logos);
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
  }, [location.pathname, logos]);

  useEffect(() => {
    if (currentEmotion) {
      const imageToShow = isLargeScreen
        ? logos[currentEmotion].banner
        : logos[currentEmotion].logo;

      // Update the current image and reset loading state
      setCurrentImage(imageToShow);
      setIsLoaded(false); // Reset loading state for new image
    }
  }, [isLargeScreen, currentEmotion, logos]);

  return (
    <div className="logo-container">
      {/* Skeleton Loader */}
      {!isLoaded && (
        <div className="random-logo-skeleton">
          <Skeleton
            variant="circular"
            animation="wave"
            width={30}
            height={30}
          />
          {isLargeScreen && (
            <Skeleton variant="text" animation="wave" width={60} />
          )}
        </div>
      )}

      {/* Main Image */}
      <img
        className={`${isLargeScreen ? "ribbit-banner" : "ribbit-logo"}`}
        src={currentImage}
        alt=""
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "block" : "none" }} // Hide image until loaded
      />
    </div>
  );
};
