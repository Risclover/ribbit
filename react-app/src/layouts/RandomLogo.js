import React, { useEffect, useState } from "react";

export const RandomLogo = ({ logos }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1070);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1070);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle page navigation
  useEffect(() => {
    // Only pick a random emotion when navigating to a new page
    const emotions = Object.keys(logos);
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setCurrentEmotion(randomEmotion);
  }, [window.location.pathname, logos]);

  // Effect to handle currentEmotion or screen size changes
  useEffect(() => {
    if (currentEmotion) {
      const imageToShow = isLargeScreen
        ? logos[currentEmotion].banner
        : logos[currentEmotion].logo;
      setCurrentImage(imageToShow);
    }
  }, [isLargeScreen, currentEmotion, logos]);

  return (
    <img
      className={`${isLargeScreen ? "ribbit-banner" : "ribbit-logo"}`}
      src={currentImage}
      alt={`Ribbit ${isLargeScreen ? "banner" : "logo"} - ${currentEmotion}`}
    />
  );
};
