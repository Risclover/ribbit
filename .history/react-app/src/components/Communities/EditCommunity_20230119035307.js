import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CommunityPage.css";
import { getSingleCommunity } from "../../store/one_community";
import { updateCommunity } from "../../store/communities";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { Modal } from "../../context/Modal";

export default function EditCommunity() {
  const { communityId } = useParams();
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );
  const user = useSelector((state) => state.session.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [display_name, setdisplay_name] = useState(
    community[0].displayName ? community[0].displayName : ""
  );
  const [description, setDescription] = useState(
    community[0].description || ""
  );
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleCommunity(communityId));
  }, [communityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = await dispatch(
        updateCommunity({ display_name, description }, communityId)
      );
      if (data.length > 0) {
        setErrors(data.errors);
        console.log("ERRORS:", errors);
      } else {
        history.push(`/communities/${communityId}`);
      }
    }
  };

  if (!community[0]) return null;
  return (
    <div className="edit-community-page">
      {user.id === community[0].userId && (
        <>
          <h1>Edit Community Details - {display_name}</h1>
          <div className="edit-community-form-container">
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
              Click the button below to delete this community. Please note that
              once you confirm deletion, you cannot undo this action.
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
                />
              </Modal>
            )}
          </div>
        </>
      )}
    </div>
  );
}
