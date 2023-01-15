import React from "react";
import { useHistory } from "react-router-dom";

export default function DiscardPost({ showDiscardModal, setShowDiscardModal }) {
  const history = useHistory();
  return (
    <>
      {showDiscardModal && (
        <div className="modal-container">
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
