import React from "react";

export default function DeveloperLink({ idx, title, link, imgsrc }) {
  return (
    <>
      <span className="tooltiptext">{title}</span>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={imgsrc} alt="Portfolio" />
      </a>
    </>
  );
}
