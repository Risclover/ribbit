import React, { useState } from "react";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { deletePost, getPosts, getUsers, getViewedPosts } from "@/store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TrashIcon } from "assets/icons/TrashIcon";

export function DeletePostModal({
  post,
  isPage,
  postType,
  setShowDeleteModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    await dispatch(getViewedPosts());

    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/all");
    }
  };

  return (
    <div>
      <button
        className={
          postType === "compact"
            ? "compact-post-menu-btn"
            : "single-post-delete-btn"
        }
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowDeleteModal(true);
        }}
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}
