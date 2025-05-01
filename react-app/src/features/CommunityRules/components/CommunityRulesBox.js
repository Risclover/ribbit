import React, { useEffect } from "react";
import { CommunityRule } from "./CommunityRule";
import { useSelector } from "react-redux";

export function CommunityRulesBox({ community, post }) {
  const communities = useSelector((state) => state.communities);
  const communityName = community?.name || post?.community?.name || "";

  const rules = community
    ? Object.values(community?.communityRules ?? {})
    : post
    ? Object.values(communities[post?.community?.id].communityRules ?? {})
    : [];

  useEffect(() => {
    console.log("rules:", rules, "community:", community);
  }, [rules, community]);

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
