import React from "react";
import CommunityRule from "./CommunityRule";

export default function CommunityRulesBox({ community }) {
  return (
    <div className="community-page-community-rules">
      <div className="community-page-rules-header">
        c/{community.name} Rules
      </div>
      <div className="community-page-rules">
        <ol>
          {Object.values(community.communityRules).map((rule, idx) => (
            <CommunityRule idx={idx} rule={rule} />
          ))}
        </ol>
      </div>
    </div>
  );
}
