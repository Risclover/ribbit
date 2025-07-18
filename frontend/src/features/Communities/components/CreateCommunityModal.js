import React, { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { useHistory } from "react-router-dom";
import { addCommunity, addToSubscriptions, getSubscriptions } from "@/store";
import { CreateCommunityForm } from "./CreateCommunityForm";
import { useScrollLock } from "@/hooks";
import { getCommunities } from "@/store";
import "../styles/CreateCommunityModal.css";

export function CreateCommunityModal({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useScrollLock(showCreateCommunityModal);

  const handleCreation = useCallback(
    async (e) => {
      e.preventDefault();
      const data = await dispatch(addCommunity({ name, description }));
      dispatch(addToSubscriptions(data.id));
      dispatch(getSubscriptions());
      dispatch(getCommunities());
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
