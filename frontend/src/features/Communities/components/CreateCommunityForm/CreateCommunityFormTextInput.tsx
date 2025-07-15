import React from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { InfoIcon } from "@/assets/icons/InfoIcon";
import { validateCommunityName } from "../../utils/validateCommunityName";

const CharacterCount = ({ count, limit }: { count: number; limit: number }) => (
  <span
    className={`create-community-input-charcount ${
      count === 0 ? "charcount-red" : ""
    }`}
  >
    {count} Characters remaining
  </span>
);

const RULES =
  `Names cannot have spaces (e.g., "c/bookclub" not "c/book club"), ` +
  `must be between 3–21 characters, and underscores ("_") are the only ` +
  `special characters allowed. Avoid using solely trademarked names ` +
  `(e.g., "c/FansOfAcme" not "c/Acme").`;

interface TextInputProps {
  label: string;
  hint: string;
  maxLength: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  showTooltip: boolean;
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  handleTooltip: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  usernameTaken: boolean;
  isSmall: boolean;
  createCommunityRules: string;
}

export const CreateCommunityFormTextInput: React.FC<TextInputProps> = ({
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
  isSmall,
  createCommunityRules,
}) => (
  <div className="modal-content-input">
    <label htmlFor={label}>{label}</label>

    <p>
      {hint}
      {label === "Name" && (
        <span
          tabIndex={0}
          className="community-name-info"
          onFocus={() => {
            if (!isSmall) setShowTooltip(true);
          }}
          onBlur={() => {
            if (!isSmall) setShowTooltip(false);
          }}
          onClick={handleTooltip}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <InfoIcon />
          {!isSmall && showTooltip && (
            <Tooltip direction="top" text={createCommunityRules} />
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
