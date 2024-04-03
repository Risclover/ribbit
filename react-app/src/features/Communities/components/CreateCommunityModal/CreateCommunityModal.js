import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addCommunity, addToSubscriptions } from "../../../../store";

import { CreateCommunityForm } from "./CreateCommunityForm";
import { validateCommunityName } from "../../utils/validateCommunityName";

import "./CreateCommunityModal.css";

export function CreateCommunityModal({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCreation = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validateCommunityName(name);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const data = await dispatch(addCommunity({ name, description }));
      if (data.length > 0) {
        setErrors(["That name is already taken."]);
        return;
      }

      await dispatch(addToSubscriptions(data.id));
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
        <div data-test-id="test" className="modal-container-create-community">
          <CreateCommunityForm
            onFormSubmit={{
              submit: handleCreation,
              cancel: closeModal,
            }}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            errors={errors}
          />
        </div>
      )}
    </>
  );
}
