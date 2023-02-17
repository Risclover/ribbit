import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateRule, getCommunityRules } from "../../../store/rules";
import { getSingleCommunity } from "../../../store/one_community";

import { Modal } from "../../../context/Modal";

import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";

import "../../../components/Modals/Modals.css";

export default function AddCommunityRule({
  setShowEditRuleModal,
  communityId,
  rule,
}) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(rule?.title);
  const [description, setDescription] = useState(rule?.description);
  const [disabled, setDisabled] = useState(title?.length === 0 ? true : false);
  const [titleError, setTitleError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const community = useSelector((state) => state.singleCommunity[communityId]);
  const rules = useSelector((state) => Object.values(state.rules));

  useEffect(() => {
    title?.length === 0 ? setDisabled(true) : setDisabled(false);
    dispatch(getSingleCommunity(community?.id));
    dispatch(getCommunityRules(communityId));
    let changed = false;
    let originalName = rule?.title;

    // if (rule?.title === title) {
    //   changed = true;
    // }

    for (let rule of rules) {
      if (rule.title === title) {
        changed = true;
      }
      if (title === originalName) {
        changed = false;
      }
    }

    if (changed) {
      setTitleError(true);
      setDisabled(true);
    } else if (!changed) {
      setTitleError(false);
    }
  }, [title, titleError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateRule({ title, description }, rule.id));
    dispatch(getCommunityRules(communityId));
    dispatch(getSingleCommunity(communityId));
    setShowEditRuleModal(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
    // await dispatch(deleteRule(rule.id));
    // setShowEditRuleModal(false);
    // dispatch(getCommunityRules(communityId));
    // dispatch(getSingleCommunity(communityId));
  };
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="rule-modal-section">
          <h2 className="rule-modal-section-title">Rule</h2>
          <textarea
            className="rule-modal-rule-input rule-input-1"
            placeholder='Rule displayed (e.g. "No photos")'
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <p className="title-exists-error">
            {titleError &&
              "You have another rule with this title. Please change."}
          </p>
          <p
            className={
              title?.length === 100
                ? "rule-modal-rule-input-chars red-chars chars-1"
                : "rule-modal-rule-input-chars chars-1"
            }
          >
            {100 - title?.length} Characters remaining
          </p>
        </div>
        <div className="rule-modal-section">
          <h2 className="rule-modal-section-title">Full description</h2>
          <textarea
            className="rule-modal-rule-input rule-input-2"
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the full description of the rule."
          ></textarea>
          <p
            className={
              description?.length === 500
                ? "rule-modal-rule-input-chars red-chars"
                : "rule-modal-rule-input-chars"
            }
          >
            {500 - description?.length} Characters remaining
          </p>
        </div>
      </div>
      <div className="modal-buttons alt-buttons">
        <button className="modal-buttons-delete" onClick={handleDelete}>
          Delete
        </button>
        <div className="modal-buttons-main">
          <button
            className="modal-buttons-left"
            onClick={() => setShowEditRuleModal(false)}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            className="modal-buttons-right"
            onClick={handleSubmit}
          >
            Save
          </button>
          {showDeleteModal && (
            <Modal
              onClose={() => setShowDeleteModal(false)}
              title="Delete rule?"
            >
              <DeleteConfirmation
                showDeleteModal={showDeleteModal}
                setShowEditRuleModal={setShowEditRuleModal}
                setShowDeleteModal={setShowDeleteModal}
                communityId={communityId}
                rule={rule}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
