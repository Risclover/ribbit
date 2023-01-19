import React, { useState } from "react";

export default function CreateCommunity({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCreation = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {showCreateCommunityModal && (
        <div className="modal-container">
          <form className="create-community-form" onSubmit={handleCreation}>
            <div className="modal-content">
              <h2>Name</h2>
              <p>Community names including capitalization cannot be changed.</p>
              <input
                type="text"
                className="create-community-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <span className="create-community-input-charcount">
                {21 - name.length} Characters remaining
              </span>
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
                type="submit"
                className="modal-buttons-right"
                onClick={
                  item === "post" ? handleDeletePost : handleDeleteComment
                }
              >
                CreateCommunity
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
