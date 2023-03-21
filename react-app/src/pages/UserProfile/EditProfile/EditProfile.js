import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile, getUsers } from "../../../store/users";

import "./EditProfile.css";

export default function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user1 = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[user1.id]);

  const [display_name, setdisplay_name] = useState(user?.displayName);
  const [about, setAbout] = useState(user?.about);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = dispatch(editProfile(user.id, { display_name, about }));
    dispatch(getUsers());
    if (data.length > 0) {
    } else {
      dispatch(getUsers());
      history.push(`/users/${user.id}/profile`);
    }
  };

  return (
    <div className="edit-profile-page">
      <form onSubmit={handleSubmit}>
        <h1>User Profile Settings</h1>
        <div className="edit-profile-page-section">
          <h2>Display name (optional)</h2>
          <p>Set a display name. This does not change your username.</p>
          <input
            className="community-name-input"
            type="text"
            maxLength={30}
            value={display_name}
            onChange={(e) => setdisplay_name(e.target.value)}
          />
          <span
            className={
              display_name.length === 30
                ? "user-profile-char-counter red-counter"
                : "user-profile-char-counter"
            }
          >
            {30 - display_name.length} Characters remaining
          </span>
        </div>
        <div className="edit-profile-page-section">
          <h2>About (optional)</h2>
          <p>A brief description of yourself shown on your profile.</p>
          <textarea
            className="user-profile-about-input"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            maxLength={200}
          ></textarea>
          <span
            className={
              about.length === 200
                ? "user-profile-char-counter red-counter"
                : "user-profile-char-counter"
            }
          >
            {200 - about.length} Characters remaining
          </span>
        </div>
        <div className="edit-profile-btns">
          <button
            className="cancel-profile-edit"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button className="submit-profile-edit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
