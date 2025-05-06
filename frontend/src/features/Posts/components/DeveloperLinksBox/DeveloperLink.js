import React from "react";

export function DeveloperLink({ title, link, imgsrc, alt }) {
  return (
    <>
      <span className="tooltiptext">{title}</span>
      <a href={link} target="_blank" rel="noreferrer" tabIndex={-1}>
        <img src={imgsrc} alt={alt} />
      </a>
    </>
  );
}
