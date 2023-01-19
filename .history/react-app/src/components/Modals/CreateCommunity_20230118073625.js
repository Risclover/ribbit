import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCommunity } from "../../store/communities";

export default function CreateCommunity({
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
      setErrors(errors);
    } else {
      errors = [];
      const data = await dispatch(addCommunity({ name, description }));
      console.log(data);
      if (data) {
        setErrors(data.errors);
      } else {
        // setShowCreateCommunityModal(false);
        history.push(`/communities/${data.id}`);
      }
    }
  };

  //   if (!errors) return null;
  return (
    <>
      {showCreateCommunityModal && (
        <div className="modal-container-create-community">
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
                  <span className="create-community-input-r">r/</span>
                </div>
                <span className={"create-community-input-charcount"}>
                  {21 - name.length} Characters remaining
                </span>
                {errors[0]}
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
                className="modal-buttons-left"
                onClick={() => setShowCreateCommunityModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="modal-buttons-right">
                Create Community
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
