import React, { useState, useCallback, useEffect } from "react";
import { Tooltip } from "../../../../components/Tooltip/Tooltip";
import { validateCommunityName } from "../../utils/validateCommunityName";
import { useCommunityNameTaken } from "../../hooks/useCommunityNameTaken";
import "./CreateCommunityModal.css";

const TextInput = ({
  label,
  hint,
  maxLength,
  value,
  onChange,
  showTooltip,
  setShowTooltip,
  handleTooltip,
  error,
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
          className="community-name-info"
          onMouseEnter={handleTooltip}
          onMouseLeave={() => {
            setShowTooltip(false);
            console.log(showTooltip);
          }}
        >
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M10,8.5 C10.553,8.5 11,8.948 11,9.5 L11,13.5 C11,14.052 10.553,14.5 10,14.5 C9.447,14.5 9,14.052 9,13.5 L9,9.5 C9,8.948 9.447,8.5 10,8.5 Z M10.7002,5.79 C10.8012,5.89 10.8702,6 10.9212,6.12 C10.9712,6.24 11.0002,6.37 11.0002,6.5 C11.0002,6.57 10.9902,6.63 10.9802,6.7 C10.9712,6.76 10.9502,6.82 10.9212,6.88 C10.9002,6.94 10.8702,7 10.8302,7.05 C10.7902,7.11 10.7502,7.16 10.7002,7.21 C10.6602,7.25 10.6102,7.29 10.5512,7.33 C10.5002,7.37 10.4402,7.4 10.3812,7.42 C10.3202,7.45 10.2612,7.47 10.1902,7.48 C10.1312,7.49 10.0602,7.5 10.0002,7.5 C9.7402,7.5 9.4802,7.39 9.2902,7.21 C9.1102,7.02 9.0002,6.77 9.0002,6.5 C9.0002,6.37 9.0302,6.24 9.0802,6.12 C9.1312,5.99 9.2002,5.89 9.2902,5.79 C9.5202,5.56 9.8702,5.46 10.1902,5.52 C10.2612,5.53 10.3202,5.55 10.3812,5.58 C10.4402,5.6 10.5002,5.63 10.5512,5.67 C10.6102,5.71 10.6602,5.75 10.7002,5.79 Z M10,16 C6.691,16 4,13.309 4,10 C4,6.691 6.691,4 10,4 C13.309,4 16,6.691 16,10 C16,13.309 13.309,16 10,16 M10,2 C5.589,2 2,5.589 2,10 C2,14.411 5.589,18 10,18 C14.411,18 18,14.411 18,10 C18,5.589 14.411,2 10,2"></path>
            </g>
          </svg>
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
          console.log("error:", error);
          console.log("validate:", validateCommunityName(value, usernameTaken));
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
          error={error}
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
