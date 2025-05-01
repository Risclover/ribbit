import { useCallback, useEffect, useState } from "react";
import { deletePost, getViewedPosts } from "@/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIdFromName } from "@/utils/getCommunityIdFromName";

export const usePostButtonHandlers = ({
  community = null,
  history,
  dispatch,
  post,
  setShowLinkCopied,
  isPage,
  setShowDeleteModal,
  setShowSubmenu = null,
}) => {
  const { communityName } = useParams();
  const communities = useSelector((state) => state.communities);
  const communityId = getIdFromName(communityName, communities);
  const currentUser = useSelector((state) => state.session.user);
  const [isCommunityOwner, setIsCommunityOwner] = useState(
    community !== null
      ? community?.userId === currentUser?.id
      : communities[communityId]?.userId === currentUser?.id
  );

  const toggleSubmenu = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowSubmenu((prev) => !prev);
  }, []);

  const copyLink = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(
      `https://ribbit-app.herokuapp.com/posts/${post?.id}`
    );
    setShowLinkCopied(true);
  });

  const editPost = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      history.push(`/posts/${post?.id}/edit`);
    },
    [history, post?.id]
  );

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    await dispatch(getViewedPosts());

    if (isPage === "community") {
      history.push(`/c/${post?.community.name}`);
    } else {
      history.push("/all");
    }
  };

  return { toggleSubmenu, copyLink, editPost, handleDelete, isCommunityOwner };
};
