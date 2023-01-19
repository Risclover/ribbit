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
              <div className="modal-content-input">
                <h2>Name</h2>
                <p>
                  Community names including capitalization cannot be changed.
                </p>
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
              <div className="modal-content-input">
                <h2>Description</h2>
                <p>Community description (optional but recommended)</p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="create-community-textarea"
                ></textarea>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-buttons-left"
                onClick={() => setShowCreateCommunityModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="modal-buttons-right">
                Create Community
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
