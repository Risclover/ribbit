import { startTransition, useCallback, useEffect, useState } from "react";
import { deletePost, getViewedPosts } from "@/store";
import { useAppSelector } from "@/store";
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
  const communities = useAppSelector((state) => state.communities.communities);
  const communityId = getIdFromName(communityName, communities);
  const currentUser = useAppSelector((state) => state.session.user);
  const [isCommunityOwner, setIsCommunityOwner] = useState(
    community !== null
      ? community?.userId === currentUser?.id
      : communities[communityId]?.userId === currentUser?.id
  );
  const viewedPosts = useAppSelector((state) =>
    Object.values(state.viewedPosts)
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
      startTransition(() => {
        history.push(`/posts/${post?.id}/edit`);
      });
    },
    [history, post?.id]
  );

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    if (viewedPosts.length === 0) await dispatch(getViewedPosts());

    if (isPage === "community") {
      history.push(`/c/${post?.community.name}`);
    } else {
      history.push("/all");
    }
  };

  return { toggleSubmenu, copyLink, editPost, handleDelete, isCommunityOwner };
};
