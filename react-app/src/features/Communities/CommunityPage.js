import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
import { getPosts } from "../../store/posts";
import { getSubscriptions } from "../../store/subscriptions";
import { getCommunities } from "../../store/communities";
import CommunityWelcome from "./CommunityWelcome";
import CommunityRulesBox from "./CommunityRulesBox";
import CommunityImage from "./CommunityImage";
import CommunityInfoBox from "./CommunityInfoBox/CommunityInfoBox";
import CommunitySubscribeBtn from "./CommunitySubscribeBtn";
import CommunityName from "./CommunityName";
import CommunityPosts from "./CommunityPosts";
import BackToTop from "../../components/BackToTop";
import "./CommunityPage.css";
import { getCommunitySettings } from "../../store/community_settings";

export default function CommunityPage({
  setPageTitle,
  setPageIcon,
  format,
  setFormat,
}) {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const [favorited, setFavorited] = useState(false);
  const [isPage, setIsPage] = useState("community");

  const posts = useSelector((state) => Object.values(state.posts));
  const community = useSelector((state) => state.singleCommunity[+communityId]);
  const user = useSelector((state) => state.session.user);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const communitySettings = useSelector((state) => state.communitySettings);
  let commPosts = posts.filter((post) => post.communityId == communityId);

  console.log("community id:", communityId);
  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getSubscriptions());
    dispatch(getPosts());
    dispatch(getSingleCommunity(+communityId));
    dispatch(getCommunitySettings(community?.id));
  }, [communityId, dispatch]);

  document.documentElement.style.setProperty(
    "--community-base-color",
    community?.communitySettings[communityId]?.baseColor
  );

  document.documentElement.style.setProperty(
    "--community-highlight",
    community?.communitySettings[communityId]?.highlight
  );

  document.documentElement.style.setProperty(
    "--community-body-bg",
    community?.communitySettings[communityId]?.bgColor
  );

  console.log("community settings:", community?.communitySettings[communityId]);

  useEffect(() => {
    document.title = community?.displayName;

    setPageIcon(
      <img
        src={community?.communityImg}
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
    <div className="community-page-container">
      <div className="community-page-header">
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
      </div>

      <div className="community-page-main">
        <div className="community-body-bg-div"></div>
        <CommunityPosts
          commPosts={commPosts}
          format={format}
          setFormat={setFormat}
          isPage={isPage}
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
