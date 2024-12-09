import React from "react";
import { DeveloperLink } from "./DeveloperLink";
import { developerLinks } from "../../data/developerLinksData";

export function DeveloperLinksBox() {
  return (
    <div className="posts-author-box">
      <h1>Developer Links</h1>
      <ul>
        {developerLinks.map((link) => (
          <li key={link.title} className="tooltip">
            <DeveloperLink
              title={link.title}
              link={link.link}
              imgsrc={link.imgsrc}
              alt={link.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
