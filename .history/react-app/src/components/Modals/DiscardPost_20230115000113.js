import React from "react";
import { useHistory } from "react-router-dom";

export default function DiscardPost() {
  const history = useHistory();
  return (
    <>
      {showDiscardModal && (
        <div className="modal-container">
          <div className="modal-topbar">
            <div className="modal-title">Discard post?</div>
            <div className="modal-close">
              <button
                className="modal-close-btn"
                onClick={() => setShowDiscardModal(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <div className="modal-content">
            Are you sure you want to discard this post? You will lose all
            progress.
          </div>
          <div className="modal-buttons">
            <button
              className="modal-buttons-left"
              onClick={() => setShowDiscardModal(false)}
            >
              Cancel
            </button>
            <button
              className="modal-buttons-right"
              onClick={() => history.push("/posts")}
            >
              Discard post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
