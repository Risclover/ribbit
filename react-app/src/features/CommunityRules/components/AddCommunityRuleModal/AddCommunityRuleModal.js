import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createRule,
  getCommunityRules,
  getSingleCommunity,
} from "../../../../store";
import "../../../../assets/styles/Modals.css";
import "./AddCommunityRuleModal.css";

export function AddCommunityRuleModal({ setShowRuleModal, communityId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(title?.length === 0 ? true : false);
  const [titleError, setTitleError] = useState(false);
  const [errors, setErrors] = useState([]);
  const rules = useSelector((state) => Object.values(state.rules));

  useEffect(() => {
    title.length === 0 ? setDisabled(true) : setDisabled(false);

    dispatch(getCommunityRules(communityId));
    let changed = false;

    for (let rule of rules) {
      if (rule.title === title) {
        changed = true;
      }
    }

    if (changed) {
      setTitleError("You have another rule with this title. Please change.");
      setErrors([]);
      setDisabled(true);
    } else if (!changed) {
      setTitleError("");
    }
  }, [title, titleError, communityId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (title.trim().length === 0) {
      errors.push("You must set a title for this rule.");
    }
    if (errors.length > 0) {
      setErrors(errors);
    } else {
      await dispatch(
        createRule(
          { title: title.trim(), description: description.trim() },
          +communityId
        )
      );
      setShowRuleModal(false);
      await dispatch(getCommunityRules(communityId));
      dispatch(getSingleCommunity(communityId));
      history.push(`/c/${communityId}/edit`);
    }
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
            {errors.map((error) => error)}
            {titleError}
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
              description.length === 500
                ? "rule-modal-rule-input-chars red-chars"
                : "rule-modal-rule-input-chars"
            }
          >
            {500 - description.length} Characters remaining
          </p>
        </div>
      </div>
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
