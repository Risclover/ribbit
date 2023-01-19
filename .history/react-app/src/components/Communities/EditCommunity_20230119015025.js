import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CommunityPage.css";

export default function EditCommunity() {
  const [displayName, setDisplayName] = useState();
  const [description, setDescription] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="edit-community-page">
      <h1>Edit Community Details</h1>
      <div className="edit-community-form-container">
        <form className="edit-community-form">
          <input
            type="text"
            placeholder="Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
