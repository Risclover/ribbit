import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCommunity, addToSubscriptions } from "../../../../store";
import "./CreateCommunityModal.css";

export const CreateCommunityForm = ({
  onFormSubmit,
  name,
  setName,
  description,
  setDescription,
  errors,
}) => (
  <form className="create-community-form" onSubmit={onFormSubmit.submit}>
    <div className="modal-content">
      <div className="modal-content-input">
        <h2>Name</h2>
        <p>Community names including capitalization cannot be changed.</p>
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
          {21 - name.length || 0} Characters remaining
        </span>
        {errors[0] && (
          <div className="create-community-errors">{errors[0]}</div>
        )}
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
        type="button"
        onClick={onFormSubmit.cancel}
      >
        Cancel
      </button>
      <button type="submit" className="blue-btn-filled btn-short">
        Create Community
      </button>
    </div>
  </form>
);
