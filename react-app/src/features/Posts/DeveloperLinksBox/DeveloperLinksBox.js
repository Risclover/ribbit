import React from "react";
import DeveloperLink from "./DeveloperLink";
import Github from "../../../images/developer-links/github.png";
import LinkedIn from "../../../images/developer-links/linkedin.png";
import Resume from "../../../images/developer-links/resume.png";
import Email from "../../../images/developer-links/mail.png";

export default function DeveloperLinksBox() {
  const developerLinks = [
    {
      title: "Developer Portfolio",
      link: "https://risclover.github.io",
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
