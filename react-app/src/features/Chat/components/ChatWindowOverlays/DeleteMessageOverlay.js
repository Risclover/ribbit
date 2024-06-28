import React from "react";

export const DeleteMessageOverlay = ({ setShowDeleteConfirmation }) => {
  const handleDeleteMsg = (e) => {
    e.preventDefault();
    console.log("delete");
  };
  return (
    <div className="overlay-container">
      <div className="delete-overlay">
        <div></div>
        <div className="delete-overlay-text">
          <div className="delete-overlay-title">Delete this message?</div>
          <div className="delete-overlay-para">
            It will be removed for everyone in this chat. You can't undo this.
          </div>
        </div>
        <div className="delete-overlay-btns">
          <button
            className="overlay-btn-left"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </button>
          <button className="overlay-btn-right" onClick={handleDeleteMsg}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
