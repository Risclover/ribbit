import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createRule, getCommunityRules } from "../../../store/rules";
import "../../../components/Modals/Modals.css";
import { getSingleCommunity } from "../../../store/one_community";

export default function AddCommunityRule({
  setShowEditRuleModal,
  communityId,
  rule,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { communityId } = useParams();

  console.log("COMMUNITY ID:", communityId);
  const [title, setTitle] = useState(rule?.title);
  const [description, setDescription] = useState(rule?.description);
  const [disabled, setDisabled] = useState(title?.length === 0 ? true : false);
  const [titleError, setTitleError] = useState(false);

  const community = useSelector((state) => state.singleCommunity[communityId]);
  const rules = useSelector((state) => Object.values(state.rules));

  useEffect(() => {
    title?.length === 0 ? setDisabled(true) : setDisabled(false);

    dispatch(getCommunityRules(communityId));
    let changed = false;

    if (rule?.title === title) {
      changed = true;
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
    await dispatch(createRule({ title, description }, +communityId));
    setShowEditRuleModal(false);
    await dispatch(getCommunityRules(communityId));
    dispatch(getSingleCommunity(communityId));
    history.push(`/c/${communityId}/edit`);
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
      <div className="modal-buttons">
        <button className="modal-buttons-delete">Delete</button>
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
        </div>
      </div>
    </div>
  );
}
