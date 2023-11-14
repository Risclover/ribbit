import React from "react";
import { DeveloperLink } from "./DeveloperLink";
import Github from "../../../assets/images/developer-links/github.png";
import LinkedIn from "../../../assets/images/developer-links/linkedin.png";
import Resume from "../../../assets/images/developer-links/resume.png";
import Email from "../../../assets/images/developer-links/mail.png";

export function DeveloperLinksBox() {
  const developerLinks = [
    {
      title: "Developer Portfolio",
      link: "https://www.saradunlop.dev",
      imgsrc: Resume,
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/sara-dunlop",
      imgsrc: LinkedIn,
    },
    {
      title: "Github",
      link: "https://www.github.com/Risclover",
      imgsrc: Github,
    },
    {
      title: "Email",
      link: "mailto:sara.dunlop.dev@gmail.com",
      imgsrc: Email,
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
