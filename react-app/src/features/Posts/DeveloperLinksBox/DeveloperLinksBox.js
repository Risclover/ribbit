import React from "react";
import DeveloperLink from "./DeveloperLink";
import Github from "../../../images/developer-links/github.png";
import LinkedIn from "../../../images/developer-links/linkedin.png";
import Resume from "../../../images/developer-links/resume.png";
import Email from "../../../images/developer-links/mail.png";

export default function DeveloperLinksBox() {
  return (
    <div className="posts-author-box">
      <h1>Developer Links</h1>
      <ul>
        <DeveloperLink
          key={0}
          title="Developer Portfolio"
          link="https://risclover.github.io"
          imgsrc={Resume}
        />

        <DeveloperLink
          key={1}
          title="LinkedIn"
          link="https://www.linkedin.com/in/sara-dunlop"
          imgsrc={LinkedIn}
        />

        <DeveloperLink
          key={2}
          link="https://www.github.com/Risclover"
          title="Github"
          imgsrc={Github}
        />

        <DeveloperLink
          key={3}
          link="mailto:sara.dunlop.dev@gmail.com"
          imgsrc={Email}
          title="Email"
        />
      </ul>
    </div>
  );
}
