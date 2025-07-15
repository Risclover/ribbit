import React, { useState, useCallback, useEffect } from "react";
import { CreateCommunityFormTextInput } from "./CreateCommunityFormTextInput";
import { useCommunityNameTaken } from "../../hooks/useCommunityNameTaken";
import { useIsSmallScreen } from "@/hooks";
import "../../styles/CreateCommunityModal.css";

const createCommunityRules =
  `Names cannot have spaces (e.g., "c/bookclub" not "c/book club"), ` +
  `must be between 3–21 characters, and underscores ("_") are the only ` +
  `special characters allowed. Avoid using solely trademarked names ` +
  `(e.g., "c/FansOfAcme" not "c/Acme").`;

interface TextAreaProps {
  label: string;
  hint: string;
  maxLength: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  hint,
  maxLength,
  value,
  onChange,
}) => (
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

interface CreateCommunityFormProps {
  onFormSubmit: {
    submit: React.FormEventHandler<HTMLFormElement>;
    cancel: React.MouseEventHandler<HTMLButtonElement>;
  };
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateCommunityForm: React.FC<CreateCommunityFormProps> = ({
  onFormSubmit,
  name,
  setName,
  description,
  setDescription,
}) => {
  /* ── local state ────────────────────────────────────────── */
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(false);

  /* ── derived data ───────────────────────────────────────── */
  const usernameTaken = useCommunityNameTaken(name);
  const isSmall = useIsSmallScreen();

  /* ── input handlers ─────────────────────────────────────── */
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [setName]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setDescription(e.target.value),
    [setDescription]
  );

  /** Centralised handler: decides whether to open alert or tooltip */
  const handleTooltip = () => {
    if (isSmall) {
      window.alert(createCommunityRules);
      /* no state toggle necessary */
    } else {
      setShowTooltip(true);
    }
  };

  /* ── validation / button disable logic ──────────────────── */
  useEffect(() => {
    if (error || name.trim().length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [error, name]);

  /* ── render ─────────────────────────────────────────────── */
  return (
    <form className="create-community-forma" onSubmit={onFormSubmit.submit}>
      <div className="modal-content">
        <CreateCommunityFormTextInput
          label="Name"
          hint="Community names including capitalization cannot be changed."
          maxLength={21}
          value={name}
          onChange={handleNameChange}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
          handleTooltip={handleTooltip}
          setError={setError}
          setFocused={setFocused}
          usernameTaken={usernameTaken}
          isSmall={isSmall}
          createCommunityRules={createCommunityRules}
        />

        {error && <div className="create-community-errors">{error}</div>}

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
          className={`blue-btn-filled btn-short ${
            disabled ? "btn-disabled" : ""
          }`}
          disabled={disabled}
        >
          Create Community
        </button>
      </div>
    </form>
  );
};
