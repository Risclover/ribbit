import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import {
  getSinglePost,
  getPosts,
  addViewedPost,
  getViewedPosts,
  getCommunitySettings,
  getCommunities,
} from "../store";

import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityDetails,
} from "../features";
import { BackToTop } from "../components";
import { PostFormatContext } from "../context/PostFormat";
import { usePageSettings } from "../hooks/usePageSettings";
import { PostModal } from "context/PostModal";
import { PostPopup } from "components/PostPopup/PostPopup";
import { useHistory } from "react-router-dom";

export function SinglePostPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { postId } = useParams();
  const { setFormat } = useContext(PostFormatContext);

  const post = useSelector((state) => state.posts[postId]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const isModal = history.action === "PUSH" && location.state?.fromInternal;

  console.log("post:", post);

  usePageSettings({
    documentTitle: post?.title + " : " + post?.communityName,
    icon: (
      <img
        src={post?.communitySettings[post?.communityId].communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    ),
    pageTitle: `c/${post?.communityName}`,
  });

  useEffect(() => {
    setFormat("Card");
    console.log("format:", "Card");
    dispatch(getSinglePost(postId));
    dispatch(getCommunities());
    dispatch(getPosts());

    dispatch(addViewedPost(postId))
      .then(() => {
        dispatch(getViewedPosts());
      })
      .catch((error) => console.error("Failed to add viewed post:", error));
  }, []);

  const handleCloseModal = () => {
    history.goBack();
  };

  if (!post || !community) return null;

  if (isModal) {
    // Modal view
    return (
      <PostModal onClose={handleCloseModal}>
        <PostPopup />
      </PostModal>
    );
  } else {
    // Full page view
    return (
      <div className="single-post-page">
        <div className="single-post-left-col">
          <SinglePost id={postId} post={post} isPage="singlepage" />
          <Comments post={post} />
        </div>
        <div className="single-post-right-col">
          <CommunityDetails
            post={post}
            pageType="singlepage"
            community={community}
          />
          {Object.values(post?.communityRules).length > 0 && (
            <CommunityRulesBox post={post} />
          )}
          <BackToTop />
        </div>
      </div>
    );
  }
}
