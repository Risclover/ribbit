import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="update-post-form-container">
      <form className="update-post-form"></form>
    </div>
  );
}
