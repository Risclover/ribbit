import React from "react";
import { useHistory } from "react-router-dom";

export function DiscardPost({
  showDiscardModal,
  setShowDiscardModal,
  communityName,
}) {
  const history = useHistory();

  const discard = (e) => {
    e.preventDefault();
    if (
      communityName !== undefined &&
      communityName !== "undefined" &&
      communityName &&
      communityName !== ""
    ) {
      history.push(`/c/${communityName}`);
    } else {
      history.goBack();
    }
  };
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
              className="blue-btn-unfilled-modal btn-short"
              onClick={() => setShowDiscardModal(false)}
            >
              Cancel
            </button>
            <button className="blue-btn-filled btn-short" onClick={discard}>
              Discard post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
