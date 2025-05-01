import React from "react";
import { useSelector } from "react-redux";
import { CommunityPosts, CommunityInfoBox, CommunityRulesBox } from "../..";
import { BackToTop } from "@/components";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/layouts";

export function CommunityPageMain({ community }) {
  const posts = useSelector((state) => Object.values(state.posts));
  const communityPosts = posts.filter(
    (post) => post.community.id === community.id
  );
  const user = useSelector((state) => state.session.user);

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
