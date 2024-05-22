import React from "react";

export const CommunityImg = ({
  imgSrc,
  imgClass,
  imgAlt,
  imgStyle,
  imgClick,
}) => {
  return (
    <img
      src={imgSrc}
      onError={(e) => (e.currentTarget.src = "https://i.imgur.com/9CI9hiO.png")}
      className={imgClass}
      alt={imgAlt}
      style={imgStyle}
      onClick={imgClick}
    />
  );
};
