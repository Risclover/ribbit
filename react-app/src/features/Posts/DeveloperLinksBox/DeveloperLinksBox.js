import React from "react";
import { DeveloperLink } from "./DeveloperLink";
import { developerLinkIcons } from "../../../assets";

export function DeveloperLinksBox() {
  const developerLinks = [
    {
      title: "Developer Portfolio",
      link: "https://www.saradunlop.dev",
      imgsrc: developerLinkIcons.Resume,
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/sara-dunlop",
      imgsrc: developerLinkIcons.LinkedIn,
    },
    {
      title: "Github",
      link: "https://www.github.com/Risclover",
      imgsrc: developerLinkIcons.GitHub,
    },
    {
      title: "Email",
      link: "mailto:sara.dunlop.dev@gmail.com",
      imgsrc: developerLinkIcons.Mail,
    },
  ];

  return (
    <div className="posts-author-box">
      <h1>Developer Links</h1>
      <ul>
        {developerLinks.map((link, idx) => (
          <li key={idx} className="tooltip">
            <DeveloperLink
              title={link.title}
              link={link.link}
              imgsrc={link.imgsrc}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
