import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSingleCommunity } from "../../../store/one_community";
import { updateCommunity } from "../../../store/communities";

import { Modal } from "../../../context/Modal";
import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";
import CommunityImg from "./CommunityImg";

import "../CommunityPage.css";

export default function EditCommunity() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [display_name, setdisplay_name] = useState(
    community[0] ? community[0].displayName : ""
  );
  const [description, setDescription] = useState(community[0]?.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getSingleCommunity(community[0]?.id));
  }, []);

  useEffect(() => {
    setdisplay_name(community[0]?.displayName);
    setDescription(community[0]?.description);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = await dispatch(
        updateCommunity({ display_name, description }, community[0].id)
      );
      if (data.length > 0) {
        setErrors(data.errors);
      } else {
        history.push(`/c/${data.id}`);
      }
    }
  };

  if (!community || !community[0]) return null;
  return (
    <div className="edit-community-page">
      <div className="edit-community-page-settings">
        {user.id === community[0].userId && (
          <>
            <h1>Community settings</h1>
            <div className="edit-community-page-section">
              <h2>Community name</h2>
              <input
                className="community-name-input"
                type="text"
                maxLength={100}
                value={display_name}
                onChange={(e) => setdisplay_name(e.target.value)}
              />
              <span
                className={
                  display_name.length === 100
                    ? "community-name-char-counter red-counter"
                    : "community-name-char-counter"
                }
              >
                {100 - display_name.length} Characters remaining
              </span>
            </div>
            <div className="edit-community-page-section">
              <h2>Community description</h2>
              <p className="community-description-details">
                This is how new members come to understand your community.
              </p>
              <textarea
                className="community-description-input"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength={500}
              ></textarea>
              <span
                className={
                  description.length === 500
                    ? "community-description-char-counter red-counter"
                    : "community-description-char-counter"
                }
              >
                {500 - description.length} Characters remaining
              </span>
            </div>
            <div className="edit-community-page-section">
              <h2>Community image</h2>
              <p className="community-description-details">
                Upload an image (png and jpg/jpeg file extensions only) to set a
                custom community image.
              </p>
            </div>
            <div className="edit-community-form-container">
              <img src={community[0].communityImg} />
              <CommunityImg />
              <form className="edit-community-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Display Name"
                  onChange={(e) => setdisplay_name(e.target.value)}
                  value={display_name}
                  maxLength={100}
                />
                <textarea
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  maxLength={500}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="delete-community">
              <h3>Delete Community</h3>
              <p>
                Click the button below to delete this community. Please note
                that once you confirm deletion, you cannot undo this action.
              </p>
              <button
                className="delete-community-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete c/{community[0].name}
              </button>
              {showDeleteModal && (
                <Modal
                  onClose={() => setShowDeleteModal(false)}
                  title={`Delete community c/${community[0].name}?`}
                >
                  <DeleteConfirmation
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                    item="community"
                    communityId={community[0].id}
                    communityName={community[0].name}
                  />
                </Modal>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
