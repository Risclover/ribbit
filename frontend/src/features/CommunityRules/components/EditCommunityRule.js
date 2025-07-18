import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  updateRule,
  getCommunityRules,
  deleteRule,
  getSingleCommunity,
} from "@/store";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import "@/assets/styles/Modals.css";
import { getCommunities } from "@/store";
import { useFocusTrap } from "@/hooks";

export function EditCommunityRule({
  showEditRuleModal,
  setShowEditRuleModal,
  communityId,
  rule,
}) {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);

  // useFocusTrap(showEditRuleModal, wrapperRef);

  const [title, setTitle] = useState(rule?.title);
  const [description, setDescription] = useState(rule?.description);
  const [disabled, setDisabled] = useState(title?.length === 0 ? true : false);
  const [titleError, setTitleError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const community = useAppSelector(
    (state) => state.singleCommunity[communityId]
  );
  const rules = useAppSelector((state) => Object.values(state.rules));

  useEffect(() => {
    // 1) If the title is empty, disable the form
    if (!title.trim()) {
      setDisabled(true);
      setTitleError(false);
      return;
    }

    // 2) Check duplicates among existing rules
    const isOriginal = title === rule?.title;
    const isDuplicate = !isOriginal && rules.some((r) => r.title === title);

    if (isDuplicate) {
      setTitleError(true);
      setDisabled(true);
    } else {
      setTitleError(false);
      setDisabled(false);
    }
  }, [title, rules, rule?.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateRule({ title, description }, rule.id));
    setShowEditRuleModal(false);
    dispatch(getSingleCommunity(communityId));
    dispatch(getCommunities());
  };

  const handleDeleteRule = async () => {
    await dispatch(deleteRule(rule.id));
    setShowDeleteModal(false);
    setShowEditRuleModal(false);
    dispatch(getCommunities());
  };

  return (
    <div className="modal-container" ref={wrapperRef}>
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
        <button
          className="modal-buttons-delete"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
        <div className="modal-buttons-main">
          <button
            className="blue-btn-unfilled-modal btn-short"
            onClick={() => setShowEditRuleModal(false)}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            className="blue-btn-filled btn-short"
            onClick={handleSubmit}
          >
            Save
          </button>
          {showDeleteModal && (
            <Modal
              close={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              title="Delete rule?"
              open={() => setShowDeleteModal(true)}
            >
              <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                handleDelete={handleDeleteRule}
                setShowDeleteModal={setShowDeleteModal}
                item="rule"
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
