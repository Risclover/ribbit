import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCommunity, addToSubscriptions, getSubscriptions } from "@/store";
import { CreateCommunityForm } from "./CreateCommunityForm";
import "./CreateCommunityModal.css";

export function CreateCommunityModal({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreation = useCallback(
    async (e) => {
      e.preventDefault();
      const data = await dispatch(addCommunity({ name, description }));
      dispatch(addToSubscriptions(data.id));
      dispatch(getSubscriptions());
      history.push(`/c/${data.name}`);
    },
    [name, description, dispatch, history]
  );

  const closeModal = useCallback(() => {
    setShowCreateCommunityModal(false);
  }, [setShowCreateCommunityModal]);

  return (
    <>
      {showCreateCommunityModal && (
        <div
          data-test-id="test"
          data-testid="create-community-modal"
          className="modal-container-create-community"
        >
          <CreateCommunityForm
            onFormSubmit={{
              submit: handleCreation,
              cancel: closeModal,
            }}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        </div>
      )}
    </>
  );
}
