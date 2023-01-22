import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";

export default function CommunityWelcome({
  showWelcomeModal,
  setShowWelcomeModal,
  community,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityName } = useParams();
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  useEffect(() => {
    dispatch(getSingleCommunity(community.id));
  }, [dispatch, community]);

  return (
    <>
      {showWelcomeModal && (
        <div className="modal-container">
          <div className="modal-content">
            Welcome to your new community, c/{community[0].name}! Set the tone
            for your community and welcome new members with a post.
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
