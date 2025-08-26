import React, { useEffect } from "react";
import { useAppSelector } from "@/store";
import { CommunityPosts, CommunityInfoBox, CommunityRulesBox } from "../..";
import { BackToTop } from "@/components";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/layouts";

export function CommunityPageMain({ community }) {
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );

  const posts = useAppSelector((state) => Object.values(state.posts.posts));
  const communityPosts = community
    ? posts.filter((post) => post.communityId === community.id)
    : [];
  const user = useAppSelector((state) => state.session.user);

  return (
    <FeedContainer>
      <div className="community-body-bg-div"></div>
      <FeedLeftColContainer>
        <CommunityPosts
          commPosts={communityPosts}
          communityName={community.name}
          user={user}
        />
      </FeedLeftColContainer>
      <FeedRightColContainer>
        <CommunityInfoBox user={user} community={community} />

        {Object.values(community.communityRules).length > 0 && (
          <CommunityRulesBox community={community} />
        )}

        <BackToTop community={true} />
      </FeedRightColContainer>
    </FeedContainer>
  );
}
