import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { ribbitLogos } from "@/assets";
import { RibbitLogo } from "@/assets";

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

export const RandomLogo = () => {
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
    const emotions = Object.keys(ribbitLogos);
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
  }, [location.pathname, ribbitLogos]);

  return (
    <div className="logo-container">
      {/* Skeleton Loader */}
      {/* {!isLoaded && (
        <div
          className="random-logo-skeleton"
          style={{ marginRight: "8px", width: "32px" }}
        >
          <Skeleton
            variant="circular"
            animation="wave"
            width={32}
            height={32}
          />
          {isLargeScreen && (
            <Skeleton variant="text" animation="wave" width={60} />
          )}
        </div>
      )} */}
      {/* Main Image */}
      <img src={ribbitLogos[currentEmotion]} />
      {isLargeScreen && <RibbitLogo />}
    </div>
  );
};
