import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteConfirmation from "../../components/Modals/DeleteConfirmation";

export default function DeletePostModal({ post, community, isPage }) {
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
          <DeleteConfirmation
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            postId={post.id}
            communityId={community?.id}
            item="post"
            post={post}
            isPage={isPage}
          />
        </Modal>
      )}
    </div>
  );
}
