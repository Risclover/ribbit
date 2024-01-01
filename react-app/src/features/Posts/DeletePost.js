import React, { useState } from "react";
import { Modal } from "../../context";
import { DeleteConfirmationModal } from "../../components";
import { deletePost, getPosts } from "../../store";

export function DeletePostModal({ post, community }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        <Modal onClose={() => setShowDeleteModal(false)} title="Delete post?">
          <DeleteConfirmationModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            item="post"
            storeFunction={deletePost}
            payload={post.id}
            getFunction={getPosts}
            isPage="singlepost"
          />
        </Modal>
      )}
    </div>
  );
}
