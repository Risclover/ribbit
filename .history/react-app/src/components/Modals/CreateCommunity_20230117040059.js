import React, { useState } from "react";

export default function CreateCommunity({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <>
      {showCreateCommunityModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Name</h2>
            <p>Community names including capitalization cannot be changed.</p>
            <input
              type="text"
              className="create-community-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            {errors.length > 0 &&
              errors.map((error) => (
                <div>{error} Sorry, r/fdsfs is taken. Try another.</div>
              ))}
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
