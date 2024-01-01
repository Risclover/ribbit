import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Link } from "react-router-dom";
import {
  updateCommunity,
  getCommunityRules,
  getCommunities,
} from "../../store";
import { Modal } from "../../context";
import { DeleteConfirmationModal } from "../../components";
import { CommunityEditRule, AddCommunityRuleModal } from "../../features";
import "./CommunitySettings.css";

export function EditCommunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { communityId } = useParams();
  const { communityName } = useParams();
  const communities = useSelector((state) => state.communities);

  const getIdFromName = (name) => {
    let result = Object.values(communities).find(
      (community) => community.name === name
    );
    console.log("result:", result);
    return result ? result.id : null;
  };

  const communityId = getIdFromName(communityName);

  const user = useSelector((state) => state.session.user);
  const community = useSelector((state) => state.singleCommunity[+communityId]);
  const rules = useSelector((state) => Object.values(state.rules));

  const [showRuleModal, setShowRuleModal] = useState(false);
  const [addAllowed, setAddAllowed] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rulesNum, setRulesNum] = useState(0);
  const [display_name, setdisplay_name] = useState(
    community ? community.displayName : ""
  );
  const [description, setDescription] = useState(community?.description);

  useEffect(() => {
    dispatch(getCommunityRules(communityId));
    dispatch(getCommunities());
  }, [community?.id, communityId, dispatch]);

  useEffect(() => {
    if (rules.length === 15) {
      setAddAllowed(false);
    }
    if (rules.length < 15) {
      setAddAllowed(true);
    }
  }, [rules.length, addAllowed, rules]);

  useEffect(() => {
    setdisplay_name(community?.displayName);
    setDescription(community?.description);

    setRulesNum(rules.length);
  }, [rulesNum, community?.displayName, community?.description, rules.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      updateCommunity({ display_name, description }, community.id)
    );

    history.push(`/c/${data.name}`);
  };

  if (!community || !community) return null;
  return (
    <div className="edit-community-page">
      <div className="edit-community-page-header">
        <div className="edit-community-top-bar">
          <img
            src={community?.communitySettings[community?.id].communityIcon}
            alt="Community"
          />
          <span className="edit-community-top-bar-name">
            <NavLink to={`/c/${communityName}`}>c/{community.name}</NavLink> /
            Community Settings
          </span>
        </div>
        <div className="edit-community-save-bar">
          <button className="blue-btn-filled btn-short" onClick={handleSubmit}>
            Save changes
          </button>
        </div>
      </div>
      <div className="edit-community-page-settings">
        {user.id === community.userId && (
          <>
            <h1>Community settings</h1>
            <Link to={`/c/${communityName}/style`}>Style</Link>

            <div className="edit-community-page-section">
              <h2>Community display name (optional)</h2>
              <p className="community-description-details">
                If input field below is empty, your display name will be your
                community name.
              </p>
              <input
                className="community-name-input"
                type="text"
                maxLength={100}
                value={display_name}
                onChange={(e) => setdisplay_name(e.target.value)}
              />
              <span
                className={
                  display_name.length === 100
                    ? "community-name-char-counter red-counter"
                    : "community-name-char-counter"
                }
              >
                {100 - display_name.length} Characters remaining
              </span>
            </div>
            <div className="edit-community-page-section">
              <h2>Community description (optional)</h2>
              <p className="community-description-details">
                This is how new members come to understand your community.
              </p>
              <textarea
                className="community-description-input"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength={500}
              ></textarea>
              <span
                className={
                  description.length === 500
                    ? "community-description-char-counter red-counter"
                    : "community-description-char-counter"
                }
              >
                {500 - description.length} Characters remaining
              </span>
            </div>
            <div className="edit-community-page-section">
              <h2>Community rules (optional)</h2>
              <p className="community-description-details">
                These are rules that visitors must follow to participate.
                Communities can have a maximum of 15 rules.
              </p>
              <div className="community-rules-container">
                <div className="community-rules-button-bar">
                  {rulesNum >= 15 && (
                    <button
                      disabled
                      className="blue-btn-filled btn-short"
                      onClick={() => setShowRuleModal(true)}
                    >
                      Add rule
                    </button>
                  )}
                  {rulesNum < 15 && (
                    <button
                      className="blue-btn-filled btn-short"
                      onClick={() => setShowRuleModal(true)}
                    >
                      Add rule
                    </button>
                  )}
                </div>
                <div className="community-rules-edit">
                  {Object.values(community.communityRules).map((rule, idx) => (
                    <CommunityEditRule
                      community={community}
                      idx={idx}
                      rule={rule}
                    />
                  ))}
                </div>
              </div>
              {showRuleModal && (
                <Modal onClose={() => setShowRuleModal(false)} title="Add rule">
                  <AddCommunityRuleModal
                    communityId={community?.id}
                    setShowRuleModal={setShowRuleModal}
                  />
                </Modal>
              )}
            </div>
            <div className="edit-community-page-section">
              <h2>Delete Community</h2>
              <p className="community-description-details">
                Click the button below to delete this community. Please note
                that once you confirm deletion, you cannot undo this action.
              </p>
              <button
                className="delete-community-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete c/{community.name}
              </button>
              {showDeleteModal && (
                <Modal
                  onClose={() => setShowDeleteModal(false)}
                  title={`Delete community c/${community.name}?`}
                >
                  <DeleteConfirmationModal
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                    item="community"
                    communityId={community.id}
                    communityName={community.name}
                    isPage="community"
                  />
                </Modal>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
