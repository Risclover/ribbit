import React, { useState, useEffect } from "react";

import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

import "./CommunityPage.css";

export default function CommunityRule({ idx, rule }) {
  const [showDesc, setShowDesc] = useState(false);
  const [noDesc, setNoDesc] = useState(false);

  useEffect(() => {
    if (rule.description.length === 0) {
      setNoDesc(true);
    }
  }, []);

  return (
    <li
      className="community-page-rule"
      onClick={() => {
        rule.description.length > 0 && setShowDesc(!showDesc);
      }}
    >
      <div className="rule-title">
        <span>
          {idx + 1}. {rule.title}
        </span>
        {!noDesc && (
          <>
            {showDesc && (
              <span className="chev">
                <VscChevronUp />
              </span>
            )}
            {!showDesc && (
              <span className="chev">
                <VscChevronDown />
              </span>
            )}
          </>
        )}
      </div>
      {showDesc && <div className="rule-description">{rule.description}</div>}
    </li>
  );
}
