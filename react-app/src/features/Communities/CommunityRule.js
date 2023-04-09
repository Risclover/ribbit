import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

import "./CommunityPage.css";

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
  const words = String(parse(content)).split(" ");
  return (
    <p>
      {words.map((word) => {
        return word.match(URL_REGEX) ? (
          <>
            <a href={word} rel="noreferrer" target="_blank">
              {word}
            </a>{" "}
          </>
        ) : (
          word + " "
        );
      })}
    </p>
  );
}

export default function CommunityRule({ idx, rule }) {
  const [showDesc, setShowDesc] = useState(false);
  const [noDesc, setNoDesc] = useState(false);

  useEffect(() => {
    if (rule.description.length === 0) {
      setNoDesc(true);
    }
  }, [rule.description.length]);

  return (
    <li
      className="community-page-rule"
      onClick={() => {
        rule.description.length > 0 && setShowDesc(!showDesc);
      }}
    >
      <div className="rule-title-box">
        <span className="rule-num">{idx + 1}.</span>
        <span className="rule-title">{rule.title}</span>
        {!noDesc && (
          <span className="rule-chevron">
            {showDesc && <VscChevronUp />}
            {!showDesc && <VscChevronDown />}
          </span>
        )}
      </div>
      {showDesc && (
        <div className="rule-description" style={{ whiteSpace: "pre-line" }}>
          {parse(rule.description)}
        </div>
      )}
    </li>
  );
}
