import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCommunity } from "../../store/communities";
import { addToSubscriptions } from "../../store/subscriptions";

export default function CreateCommunityModal({
  showCreateCommunityModal,
  setShowCreateCommunityModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCreation = async (e) => {
    e.preventDefault();
    let errors = [];

    if (name.length < 3 || name.length > 21 || !/^\w+$/.test(name))
      errors.push(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );

    if (errors.length > 0) {
      setErrors(errors.slice(0, 5));
    } else {
      errors = [];
      const data = await dispatch(addCommunity({ name, description }));

      if (data.length > 0) {
        setErrors([...errors, "That name is already taken."]);
      } else {
        await dispatch(addToSubscriptions(data.id));
        history.push(`/c/${data.id}`);
      }
    }
  };

  return (
    <>
      {showCreateCommunityModal && (
        <div data-test-id="test" className="modal-container-create-community">
          <form className="create-community-form" onSubmit={handleCreation}>
            <div className="modal-content">
              <div className="modal-content-input">
                <h2>Name</h2>
                <p>
                  Community names including capitalization cannot be changed.
                </p>
                <div className="create-community-input-box">
                  <input
                    type="text"
                    className="create-community-input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    maxLength={21}
                  />
                  <span className="create-community-input-r">c/</span>
                </div>
                <span
                  className={
                    name.length < 21
                      ? "create-community-input-charcount"
                      : "create-community-input-charcount charcount-red"
                  }
                >
                  {21 - name?.length || 0} Characters remaining
                </span>
                <div className="create-community-errors">{errors[0]}</div>
              </div>
              <div className="modal-content-input">
                <h2>Description</h2>
                <p>Community description (optional but recommended)</p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="create-community-textarea"
                  maxLength={500}
                ></textarea>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="blue-btn-unfilled-modal btn-short"
                onClick={() => setShowCreateCommunityModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="blue-btn-filled btn-short">
                Create Community
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
