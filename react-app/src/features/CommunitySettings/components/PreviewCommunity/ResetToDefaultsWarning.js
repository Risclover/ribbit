import React from "react";
import { useDispatch } from "react-redux";
import { getCommunitySettings } from "store";
import { getCommunities } from "store";
import { resetToDefault } from "store";

export const ResetToDefaultsWarning = ({ community, setShowResetWarning }) => {
  const dispatch = useDispatch();

  const handleDefaultReset = () => {
    dispatch(resetToDefault(community?.id));
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community?.id));
    setShowResetWarning(false);
  };

  return (
    <div className="outside-click-warning">
      <p>
        Resetting to defaults here will rollback all of your past edits to when
        your community was first created.
      </p>
      <div className="outside-click-warning-btns">
        <button
          className="blue-btn-unfilled btn-short"
          onClick={() => setShowResetWarning(false)}
        >
          Cancel
        </button>
        <button
          className="blue-btn-filled btn-short"
          onClick={handleDefaultReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
