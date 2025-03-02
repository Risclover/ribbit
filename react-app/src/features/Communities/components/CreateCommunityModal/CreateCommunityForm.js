import React, { useState, useCallback, useEffect } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { validateCommunityName } from "../../utils/validateCommunityName";
import { useCommunityNameTaken } from "../../hooks/useCommunityNameTaken";
import "./CreateCommunityModal.css";
import { InfoIcon } from "@/assets/icons/InfoIcon";

const TextInput = ({
  label,
  hint,
  maxLength,
  value,
  onChange,
  showTooltip,
  setShowTooltip,
  handleTooltip,
  setError,
  setFocused,
  usernameTaken,
}) => (
  <div className="modal-content-input">
    <label htmlFor="Name">{label}</label>
    <p>
      {hint}
      {label === "Name" && (
        <span
          tabIndex={0}
          className="community-name-info"
          onMouseEnter={handleTooltip}
          onMouseLeave={() => {
            setShowTooltip(false);
          }}
        >
          <InfoIcon />
          {showTooltip && (
            <Tooltip
              direction="up"
              text={`Names cannot have spaces (e.g., "c/bookclub" not "c/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "c/FansOfAcme" not "c/Acme").`}
            />
          )}
        </span>
      )}
    </p>

    <div className="create-community-input-box">
      <input
        id={label}
        type="text"
        name={label}
        className="create-community-input"
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setError(validateCommunityName(value, usernameTaken));
        }}
      />
      {label === "Name" && <span className="create-community-input-r">c/</span>}
    </div>
    <CharacterCount count={maxLength - value.length} limit={maxLength} />
  </div>
);

const CharacterCount = ({ count, limit }) => (
  <span
    className={`create-community-input-charcount ${
      count === 0 && "charcount-red"
    }`}
  >
    {count} Characters remaining
  </span>
);

const TextArea = ({ label, hint, maxLength, value, onChange }) => (
  <div className="modal-content-input">
    <label htmlFor={label}>{label}</label>
    <p>{hint}</p>
    <textarea
      id={label}
      className="create-community-textarea"
      maxLength={maxLength}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const CreateCommunityForm = ({
  onFormSubmit,
  name,
  setName,
  description,
  setDescription,
}) => {
  const handleNameChange = useCallback(
    (e) => setName(e.target.value),
    [setName]
  );
  const handleDescriptionChange = useCallback(
    (e) => setDescription(e.target.value),
    [setDescription]
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const usernameTaken = useCommunityNameTaken(name);

  const handleTooltip = () => {
    setShowTooltip(true);
  };

  useEffect(() => {
    if (error.length > 0 || name.length === 0) {
      setDisabled(true);
    } else if (error.length === 0) {
      setDisabled(false);
    }
  }, [error]);

  return (
    <form className="create-community-forma" onSubmit={onFormSubmit.submit}>
      <div className="modal-content">
        <TextInput
          handleTooltip={handleTooltip}
          setShowTooltip={setShowTooltip}
          showTooltip={showTooltip}
          label="Name"
          hint={"Community names including capitalization cannot be changed."}
          maxLength={21}
          value={name}
          onChange={handleNameChange}
          setError={setError}
          setFocused={setFocused}
          focused={focused}
          usernameTaken={usernameTaken}
          setDisabled={setDisabled}
        />
        {error.length > 0 && (
          <div className="create-community-errors">{error}</div>
        )}
        <TextArea
          label="Community description"
          hint="This is how new members come to understand your community."
          maxLength={500}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="modal-buttons">
        <button
          className="blue-btn-unfilled-modal btn-short"
          type="button"
          onClick={onFormSubmit.cancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`blue-btn-filled btn-short ${disabled && "btn-disabled"}`}
          disabled={disabled}
        >
          Create Community
        </button>
      </div>
    </form>
  );
};
