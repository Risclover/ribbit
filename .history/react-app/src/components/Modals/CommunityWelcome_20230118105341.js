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
            Welcome to your new community, c/{community.name}! Set the tone for
            your community and welcome new members with a post.
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
