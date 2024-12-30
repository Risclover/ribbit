import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCommunityRules } from "store";

export default function useAddCommunityRuleModal({ communityId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(
    title?.length === 0 || errors.length > 0
  );

  const rules = useSelector((state) => Object.values(state.rules));

  useEffect(() => {
    dispatch(getCommunityRules(communityId));

    for (let rule of rules) {
      if (rule.title === title) {
        setTitleError("You have another rule with this title. Please change.");
        setErrors([]);
      } else {
        setTitleError("");
      }
    }
  }, [title, titleError, communityId]);
  return <div>useAddCommunityRuleModal</div>;
}
