import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function OutsideClickWarning({ setShowWarning }) {
  const history = useHistory();
  return (
    <div className="outside-click-warning">
      <p>
        You have made some changes to your community, do you wish to leave this
        menu without saving?
      </p>
      <div className="outside-click-warning-btns">
        <button
          className="blue-btn-unfilled btn-short"
          onClick={() => setShowWarning(false)}
        >
          Cancel
        </button>
        <button
          className="blue-btn-filled btn-short"
          onClick={() => history.push(`/c/${location.pathname.slice(3, 5)}`)}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
