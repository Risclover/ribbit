import React from "react";

export default function CreateCommunity({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  return (
    <>
      {showCreateCommunityModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Name</h2>
            <p>Community names including capitalization cannot be changed.</p>
            <input type="text" className="create-community-input" onChange={(e) => setName}
          </div>
          <div className="modal-buttons">
            <button
              className="modal-buttons-left"
              onClick={() => setShowCreateCommunityModal(false)}
            >
              Cancel
            </button>
            <button
              className="modal-buttons-right"
              onClick={item === "post" ? handleDeletePost : handleDeleteComment}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
