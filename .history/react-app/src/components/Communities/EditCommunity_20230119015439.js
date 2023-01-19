import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./CommunityPage.css";
import { getSingleCommunity } from "../../store/one_community";
import { updateCommunity } from "../../store/communities";

export default function EditCommunity() {
  const { communityId } = useParams();
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  const [displayName, setDisplayName] = useState(community[0]?.displayName);
  const [description, setDescription] = useState(community[0]?.description);
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
        updateCommunity({ displayName, description }, communityId)
      );
      if (data) {
        setErrors(data.errors);
        console.log("ERRORS:", errors);
      }
    }
  };
  return (
    <div className="edit-community-page">
      <h1>Edit Community Details - {displayName}</h1>
      <div className="edit-community-form-container">
        <form className="edit-community-form" onSubmit={handleSubmit}>
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
