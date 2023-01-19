import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function EditCommunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="edit-community-page">
      <h1>Edit Community Details</h1>
      <div className="edit-community-form-container">
        <form className="edit-community-form">
          <input type="text" placeholder="Display Name" />
        </form>
      </div>
    </div>
  );
}
