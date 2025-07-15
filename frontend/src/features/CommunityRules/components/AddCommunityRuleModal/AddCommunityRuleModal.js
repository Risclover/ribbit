import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useHistory } from "react-router-dom";

import { createRule, getCommunityRules, getSingleCommunity } from "@/store";

import "@/assets/styles/Modals.css";
import "./AddCommunityRuleModal.css";
import { getCommunities } from "@/store";

export function AddCommunityRuleModal({
  setShowRuleModal,
  communityId,
  communityName,
}) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // Local states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  // Select current rules from Redux
  const rules = useAppSelector((state) => Object.values(state.rules));

  // Fetch community rules upon component mount or communityId change
  useEffect(() => {
    dispatch(getCommunityRules(communityId));
  }, [communityId, dispatch]);

  // Validate title
  useEffect(() => {
    const trimmedTitle = title.trim();

    // If there's no title or it's only whitespace
    if (!trimmedTitle) {
      setTitleError("");
      setErrors([]);
      setDisabled(true);
      return;
    }

    // Check for duplicates
    const isDuplicateTitle = rules.some((rule) => rule.title === trimmedTitle);

    if (isDuplicateTitle) {
      setTitleError("You have another rule with this title. Please change.");
      setErrors([]);
      setDisabled(true);
    } else {
      setTitleError("");
      setDisabled(false);
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = [];
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      currentErrors.push("You must set a title for this rule.");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    // Create rule in the backend
    await dispatch(
      createRule(
        { title: trimmedTitle, description: trimmedDescription },
        +communityId
      )
    );

    // Close modal
    setShowRuleModal(false);

    // Refresh rules & community
    dispatch(getCommunityRules(communityId));
    dispatch(getCommunities());

    // Redirect
    history.push(`/c/${communityName}/edit`);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Rule Title Input */}
        <div className="rule-modal-section">
          <h2 className="rule-modal-section-title">Rule</h2>
          <textarea
            className="rule-modal-rule-input rule-input-1"
            placeholder='Rule displayed (e.g. "No photos")'
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Display errors and/or titleError */}
          <p className="title-exists-error">
            {[...errors, titleError].join(" ")}
          </p>
          <p
            className={
              title.length === 100
                ? "rule-modal-rule-input-chars red-chars chars-1"
                : "rule-modal-rule-input-chars chars-1"
            }
          >
            {100 - title.length} Characters remaining
          </p>
        </div>

        {/* Rule Description Input */}
        <div className="rule-modal-section">
          <h2 className="rule-modal-section-title">Full description</h2>
          <textarea
            className="rule-modal-rule-input rule-input-2"
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the full description of the rule."
          />
          <p
            className={
              description.length === 500
                ? "rule-modal-rule-input-chars red-chars"
                : "rule-modal-rule-input-chars"
            }
          >
            {500 - description.length} Characters remaining
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="modal-buttons">
        <button
          className="blue-btn-unfilled-modal btn-short"
          onClick={() => setShowRuleModal(false)}
        >
          Cancel
        </button>
        <button
          disabled={disabled}
          className="blue-btn-filled btn-short"
          onClick={handleSubmit}
        >
          Add new rule
        </button>
      </div>
    </div>
  );
}
