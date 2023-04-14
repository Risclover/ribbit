import React from "react";
import { useHistory } from "react-router-dom";

export default function DiscardPost({
  showDiscardModal,
  setShowDiscardModal,
  community_id,
}) {
  const history = useHistory();

  const discard = (e) => {
    e.preventDefault();
    if (
      community_id !== undefined &&
      community_id !== "undefined" &&
      community_id &&
      !isNaN(community_id)
    ) {
      history.push(`/c/${community_id}`);
    } else {
      history.push("/home");
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
