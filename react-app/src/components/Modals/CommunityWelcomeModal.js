import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";

export default function CommunityWelcomeModal({
  showWelcomeModal,
  setShowWelcomeModal,
  community,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const singleCommunity = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  return (
    <>
      {showWelcomeModal && (
        <div className="modal-container">
          <div className="modal-content">
            Welcome to your new community, c/{singleCommunity[0].name}! Set the
            tone for your community and welcome new members with a post.
          </div>
          <div className="modal-buttons">
            <button
              className="blue-btn-unfilled-modal btn-short"
              onClick={() => setShowWelcomeModal(false)}
            >
              Continue
            </button>
            <button
              className="blue-btn-filled btn-short"
              onClick={() => history.push(`/posts/submit`)}
            >
              Create A Post
            </button>
          </div>
        </div>
      )}
    </>
  );
}
