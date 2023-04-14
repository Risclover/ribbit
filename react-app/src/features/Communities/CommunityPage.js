import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
import { getPosts } from "../../store/posts";
import { getSubscriptions } from "../../store/subscriptions";
import "./CommunityPage.css";
import CommunityWelcomeModal from "../../components/Modals/CommunityWelcomeModal";
import CommunityRulesBox from "./CommunityRulesBox";
import CommunityImage from "./CommunityImage";
import CommunityInfoBox from "./CommunityInfoBox";
import CommunitySubscribeBtn from "./CommunitySubscribeBtn";
import CommunityName from "./CommunityName";
import CommunityPosts from "./CommunityPosts";
import BackToTop from "../../components/BackToTop";

export default function CommunityPage({ format, setFormat }) {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [isPage, setIsPage] = useState("community");

  const posts = useSelector((state) => Object.values(state.posts));
  const community = useSelector((state) => state.singleCommunity[+communityId]);
  const user = useSelector((state) => state.session.user);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  let commPosts = posts.filter((post) => post.communityId == communityId);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getSingleCommunity(+communityId));
    dispatch(getSubscriptions());
  }, [communityId, dispatch]);

  useEffect(() => {
    if (favoriteCommunities[community?.id]) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favorited, favoriteCommunities]);

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
                setShowLoginForm={setShowLoginForm}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="community-page-main">
        <CommunityPosts
          commPosts={commPosts}
          format={format}
          setFormat={setFormat}
          isPage={isPage}
          communityId={communityId}
          user={user}
          setShowLoginForm={setShowLoginForm}
        />
        <div className="community-page-right-col">
          <CommunityInfoBox
            setFavorited={setFavorited}
            user={user}
            favoriteCommunities={favoriteCommunities}
            community={community}
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />

          {Object.values(community.communityRules).length > 0 && (
            <CommunityRulesBox community={community} />
          )}

          <BackToTop />
        </div>
      </div>

      <CommunityWelcomeModal
        community={community}
        user={user}
        posts={posts}
        commPosts={commPosts}
      />
    </div>
  );
}
