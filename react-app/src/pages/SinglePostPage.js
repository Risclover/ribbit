import React, { useContext, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getPosts,
  addViewedPost,
  getCommunitySettings,
  getCommunities,
} from "../store";

import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityInfoBox,
} from "../features";
import { BackToTop } from "../components";
import { PostFormatContext } from "@/context";
import { usePageSettings } from "../hooks/usePageSettings";
import { CommunityImg } from "components/CommunityImg";
import { useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export function SinglePostPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { setFormat } = useContext(PostFormatContext);
  const post = useSelector((state) => state.posts[postId]);
  const user = useSelector((state) => state.session.user);

  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [bannerHeight, setBannerHeight] = useState(null);

  useEffect(() => {
    setBannerHeight(
      document.documentElement.style.getPropertyValue(
        "--community-banner-height"
      )
    );
  }, [bannerHeight, community, document]);

  usePageSettings({
    documentTitle: post?.title + " : " + post?.communityName,
    icon:
      post !== undefined ? (
        <CommunityImg
          imgStyle={{
            backgroundColor: `${
              post?.communitySettings[post?.communityId].baseColor
            }`,
          }}
          imgSrc={post?.communitySettings[post?.communityId].communityIcon}
          imgClass="nav-left-dropdown-item-icon item-icon-circle"
          imgAlt="Community"
        />
      ) : (
        <Skeleton variant="circular" animation="wave" width={20} height={20} />
      ),
    pageTitle:
      post !== undefined ? (
        `c/${post?.communityName}`
      ) : (
        <Skeleton animation="wave" variant="text" />
      ),
  });

  useEffect(() => {
    setFormat("Card");
    batch(() => {
      if (!community) dispatch(getCommunities());
      if (!post) dispatch(getPosts());
      dispatch(getCommunitySettings(community?.id));
      dispatch(addViewedPost(post?.id));
    });
  }, []);

  const handleBannerClick = () => {
    history.push(`/c/${community?.name}`);
  };

  if (!post || !community) return null;

  return (
    <div className="single-post-page">
      <div className="single-post-page-banner" onClick={handleBannerClick}>
        <div className="single-post-page-banner-content-container">
          <div className="single-post-page-banner-content">
            <div
              className="single-post-page-community-icon"
              style={{
                backgroundImage: `url${
                  community.communitySettings[community?.id].communityIcon
                } no-repeat center`,
              }}
            >
              <CommunityImg
                imgClass={
                  bannerHeight === "80px"
                    ? "single-post-page-community-icon-img"
                    : "single-post-page-community-icon-larger"
                }
                imgSrc={
                  community.communitySettings[community?.id].communityIcon
                }
                imgAlt={"c/" + community.name + " icon"}
              />
            </div>
            <span
              className="single-post-page-community-name"
              style={{
                paddingTop: bannerHeight === "80px" ? "4px" : "14px",
              }}
            >
              c/{post?.communityName}
            </span>
          </div>
        </div>
      </div>
      <div className="single-post-page-main">
        <div className="single-post-left-col">
          <SinglePost id={post.id} post={post} isPage="singlepage" />
          <Comments post={post} />
        </div>
        <div className="single-post-right-col">
          <CommunityInfoBox
            user={user}
            community={community}
            isPage="singlepage"
          />
          {Object.values(post?.communityRules).length > 0 && (
            <CommunityRulesBox post={post} />
          )}
          <BackToTop />
        </div>
      </div>
    </div>
  );
}
