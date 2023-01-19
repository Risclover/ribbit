import React from "react";

export default function CommunityWelcome({
  showWelcomeModal,
  setShowWelcomeModal,
}) {
  return (
    <>
      {showDeleteModal && (
        <div className="modal-container">
          <div className="modal-content">
            Are you sure you want to delete your {item}? You can't undo this.
          </div>
          <div className="modal-buttons">
            <button
              className="modal-buttons-left"
              onClick={() => setShowDeleteModal(false)}
            >
              Continue
            </button>
            <button
              className="modal-buttons-right"
              onClick={item === "post" ? handleDeletePost : handleDeleteComment}
            >
              Create A Post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
