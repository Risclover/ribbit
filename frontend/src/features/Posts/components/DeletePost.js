import React, { useState } from "react";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import {
  deletePost,
  getPosts,
  getUsers,
  getViewedPosts,
  useAppSelector,
} from "@/store";
import { useAppDispatch } from "@/store";
import { useHistory } from "react-router-dom";
import { TrashIcon } from "@/assets/icons/TrashIcon";

export function DeletePostModal({
  post,
  isPage,
  postType,
  setShowDeleteModal,
}) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const viewedPosts = useAppSelector((state) =>
    Object.values(state.viewedPosts)
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
        <span className="single-post-button-text">Delete</span>
      </button>
    </div>
  );
}
