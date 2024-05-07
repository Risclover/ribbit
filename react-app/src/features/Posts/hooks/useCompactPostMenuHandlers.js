import React, { useCallback } from "react";
import { deletePost, getViewedPosts } from "../../../store";

export const useCompactPostMenuHandlers = (
  history,
  dispatch,
  post,
  setShowSubmenu,
  setShowLinkCopied,
  isPage,
  setShowDeleteModal
) => {
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
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
  };

  return { toggleSubmenu, copyLink, editPost, handleDelete };
};
