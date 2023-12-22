import React from "react";
import { CommunityRule } from "./CommunityRule";

export function CommunityRulesBox({ community, post }) {
  return (
    <div className="community-page-community-rules">
      <div className="community-page-rules-header">
        c/{community && community.name}
        {post && post?.communityName} Rules
      </div>
      <div className="community-page-rules">
        <ol>
          {community &&
            Object.values(community.communityRules).map((rule, idx) => (
              <CommunityRule key={rule.id} idx={idx} rule={rule} />
            ))}
          {post &&
            Object.values(post?.communityRules).map((rule, idx) => (
              <CommunityRule key={rule.id} idx={idx} rule={rule} />
            ))}
        </ol>
      </div>
    </div>
  );
}
