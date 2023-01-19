import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function EditCommunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  return <div className="edit-community-page"></div>;
}
