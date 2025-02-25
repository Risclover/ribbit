import React from "react";

export const DeleteMessageOverlay = ({ setActiveOverlay, handleDeleteMsg }) => {
  return (
    <div className="overlay-container">
      <div className="delete-overlay">
        <div className="delete-overlay-text">
          <div className="delete-overlay-title">Delete this message?</div>
          <div className="delete-overlay-para">
            It will be removed for everyone in this chat. You can't undo this.
          </div>
        </div>
        <div className="delete-overlay-btns">
          <button
            className="overlay-btn-left"
            onClick={() => setActiveOverlay(null)}
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
