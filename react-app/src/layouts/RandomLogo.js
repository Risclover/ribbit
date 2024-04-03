import React, { useEffect, useState } from "react";

export const RandomLogo = ({ logos }) => {
  const [currentLogo, setCurrentLogo] = useState("");

  useEffect(() => {
    const pickRandomLogo = () => {
      const randomIndex = Math.floor(Math.random() * logos.length);
      setCurrentLogo(logos[randomIndex]);
    };

    pickRandomLogo();
  }, [window.location.pathname]);

  return <img className="ribbit-logo-large" src={currentLogo} alt="Logo" />;
};
