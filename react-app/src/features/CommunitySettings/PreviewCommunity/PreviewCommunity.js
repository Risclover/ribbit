import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleCommunity,
  getPosts,
  getSubscriptions,
  getCommunities,
} from "../../../store";
import {
  CommunityWelcome,
  CommunityImage,
  CommunitySubscribeBtn,
  CommunityInfoBox,
  CommunityRulesBox,
  CommunityName,
  CommunityPosts,
  CommunityPageHeader,
} from "../..";
import { BackToTop } from "../../../components";
import { PostFormatContext } from "../../../context";
import "../../Communities/CommunityPage.css";
import { usePageSettings } from "../../../hooks/usePageSettings";
import "./PreviewCommunity.css";

export function PreviewCommunity() {
  const dispatch = useDispatch();
  const { communityName } = useParams();

  const { format } = useContext(PostFormatContext);

  const [favorited, setFavorited] = useState(false);

  const posts = useSelector((state) => Object.values(state.posts));
  const communities = useSelector((state) => Object.values(state.communities));
  console.log(
    "communities:",
    communities?.find((community) => community.name === communityName)?.id
  );

  const communityId = communities?.find(
    (community) => community.name === communityName
  )?.id;
  const user = useSelector((state) => state.session.user);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const community = communities?.find(
    (community) => community.name === communityName
  );
  console.log("comm:", community);

  let commPosts = posts.filter((post) => post.communityId == communityId);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getSubscriptions());
    dispatch(getPosts());
  }, [communityName, communityId, dispatch]);

  usePageSettings({
    documentTitle: community?.displayName,
    icon: (
      <img
        style={{
          backgroundColor: `${
            community?.communitySettings[community?.id].baseColor
          }`,
        }}
        src={community?.communitySettings[community?.id].communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    ),
    pageTitle: `c/${community?.name}`,
  });

  useEffect(() => {
    if (favoriteCommunities[community?.id]) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favorited, favoriteCommunities, community?.id]);

  if (!community || !posts) return null;
  return (
    <div className="preview-community-page-container">
      <CommunityPageHeader community={community} />
      {/* <div className="community-page-header">
        <div className="community-page-header-top"></div>
        <div className="community-page-header-btm">
          <div
            className={
              format === "Card"
                ? "community-header-info"
                : "community-header-info-alt"
            }
          >
            <div className="community-header-info-details">
              <CommunityImage user={user} community={community} />
              <CommunityName community={community} />
              <CommunitySubscribeBtn
                user={user}
                community={community}
                communityId={+communityId}
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="posts-container">
        <div className="preview-community-body-bg-div"></div>
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          <CommunityPosts
            commPosts={commPosts}
            communityId={community.id}
            user={user}
          />
        </div>
        <div className="posts-right-col">
          <CommunityInfoBox
            setFavorited={setFavorited}
            user={user}
            favoriteCommunities={favoriteCommunities}
            community={community}
          />

          {Object.values(community.communityRules).length > 0 && (
            <CommunityRulesBox community={community} />
          )}

          <BackToTop community={true} />
        </div>
      </div>

      <CommunityWelcome
        community={community}
        user={user}
        posts={posts}
        commPosts={commPosts}
      />
    </div>
  );
}
