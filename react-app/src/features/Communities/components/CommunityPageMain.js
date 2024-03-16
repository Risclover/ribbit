import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CommunityPosts, CommunityInfoBox, CommunityRulesBox } from "../..";
import { BackToTop } from "../../../components";

export function CommunityPageMain({ community }) {
  const posts = useSelector((state) => Object.values(state.posts));
  const communityPosts = posts.filter(
    (post) => post.communityId === community.id
  );
  const user = useSelector((state) => state.session.user);

  return (
    <div className="community-page-main">
      <div className="community-body-bg-div"></div>
      <CommunityPosts
        commPosts={communityPosts}
        communityName={community.name}
        user={user}
      />
      <div className="community-page-right-col">
        <CommunityInfoBox user={user} community={community} />

        {Object.values(community.communityRules).length > 0 && (
          <CommunityRulesBox community={community} />
        )}

        <BackToTop community={true} />
      </div>
    </div>
  );
}
