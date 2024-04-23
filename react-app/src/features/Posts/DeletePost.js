import React, { useState } from "react";
import { Modal } from "../../context";
import { DeleteConfirmationModal } from "../../components";
import { deletePost, getPosts, getUsers, getViewedPosts } from "../../store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export function DeletePostModal({ post, isPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);

    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
    dispatch(getViewedPosts());
    dispatch(getPosts());
  };

  return (
    <div>
      <button
        className="single-post-delete-btn"
        onClick={(e) => {
          e.preventDefault();
          setShowDeleteModal(true);
        }}
      >
        <i className="fa-regular fa-trash-can"></i>
        Delete
      </button>
      {showDeleteModal && (
        <Modal
          onClose={() => setShowDeleteModal(false)}
          title="Delete post?"
          open={() => setShowDeleteModal(true)}
        >
          <DeleteConfirmationModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            handleDelete={handleDelete}
            item="post"
          />
        </Modal>
      )}
    </div>
  );
}
