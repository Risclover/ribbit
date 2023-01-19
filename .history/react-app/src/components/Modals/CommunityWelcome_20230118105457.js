import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function CommunityWelcome({
  showWelcomeModal,
  setShowWelcomeModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      {showWelcomeModal && (
        <div className="modal-container">
          <div className="modal-content">
            Welcome to your new community, c/{community.name}! Set the tone for
            your community and welcome new members with a post.
          </div>
          <div className="modal-buttons">
            <button
              className="modal-buttons-left"
              onClick={() => setShowWelcomeModal(false)}
            >
              Continue
            </button>
            <button
              className="modal-buttons-right"
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
