import React from "react";

export default function DeveloperLink({ key, title, link, imgsrc }) {
  return (
    <li key={key} className="tooltip">
      <span className="tooltiptext">{title}</span>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={imgsrc} alt="Portfolio" />
      </a>
    </li>
  );
}
