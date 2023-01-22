import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CommunityPage.css";
import { getSingleCommunity } from "../../store/one_community";
import { updateCommunity } from "../../store/communities";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { Modal } from "../../context/Modal";

export default function EditCommunity() {
  const { communityName } = useParams();
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );
  const user = useSelector((state) => state.session.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [display_name, setdisplay_name] = useState(community[0]?.displayName);
  const [description, setDescription] = useState(community[0]?.description);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleCommunity(community[0]?.id));
  }, [community[0]]);

  useEffect(() => {
    setdisplay_name(community[0]?.displayName);
    setDescription(community[0]?.description);
  }, [community[0]?.description, community[0]?.displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = await dispatch(
        updateCommunity({ display_name, description }, community[0].name)
      );
      if (data.length > 0) {
        setErrors(data.errors);
        console.log("ERRORS:", errors);
      } else {
        history.push(`/c/${data.name}`);
      }
    }
  };

  if (!community || !community[0]) return null;
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
                  communityName={community[0].name}
                />
              </Modal>
            )}
          </div>
        </>
      )}
    </div>
  );
}
