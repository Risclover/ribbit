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
} from "../../../features";
import { BackToTop } from "../../../components";
import { PageTitleContext, PostFormatContext } from "../../../context";
import "../../Communities/CommunityPage.css";

export function PreviewCommunity({ setPageIcon }) {
  const { setPageTitle } = useContext(PageTitleContext);
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const { format } = useContext(PostFormatContext);

  const [favorited, setFavorited] = useState(false);

  const posts = useSelector((state) => Object.values(state.posts));
  const community = useSelector((state) => state.singleCommunity[+communityId]);
  const user = useSelector((state) => state.session.user);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  let commPosts = posts.filter((post) => post.communityId == communityId);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getSubscriptions());
    dispatch(getPosts());
    dispatch(getSingleCommunity(+communityId));
  }, [communityId, dispatch]);

  useEffect(() => {
    document.title = community?.displayName;

    setPageIcon(
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
    );
    setPageTitle(
      <span className="nav-left-dropdown-item">c/{community?.name}</span>
    );
  }, [community, setPageTitle, setPageIcon]);

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

      <div className="community-page-main">
        <div className="preview-community-body-bg-div"></div>

        <CommunityPosts
          commPosts={commPosts}
          communityId={communityId}
          user={user}
        />
        <div className="community-page-right-col">
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
