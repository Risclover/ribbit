import React from "react";
import { CommunityRule } from "./CommunityRule";

export function CommunityRulesBox({ community, post }) {
  const communityName = community?.name || post?.communityName || "";

  const rules = community
    ? Object.values(community.communityRules)
    : post
    ? Object.values(post.communityRules)
    : [];

  return (
    <div className="community-page-community-rules">
      <div className="community-page-rules-header">c/{communityName} Rules</div>
      <div className="community-page-rules">
        <ol>
          {rules.map((rule, idx) => (
            <CommunityRule key={rule.id} idx={idx} rule={rule} />
          ))}
        </ol>
      </div>
    </div>
  );
}
