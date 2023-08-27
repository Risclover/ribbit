import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useAutosizeTextArea from "../../../components/Modals/ChatWindow/ChatWindowRight/ChatWindowInput/useAutosizeTextArea";

import { updateCommunity } from "../../../store/communities";

import { FaPen } from "react-icons/fa";
import HandleClickOutside from "../../../components/HandleClickOutside";

export default function CommunityDescription({ community, user }) {
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState(community.description);

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(
        e,
        wrapperRef,
        showEditDescription,
        setShowEditDescription
      );
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(
          e,
          wrapperRef,
          showEditDescription,
          setShowEditDescription
        );
      });
    };
  }, [wrapperRef, showEditDescription]);

  useAutosizeTextArea(textareaRef.current, description);

  const handleSaveDescription = async () => {
    const data = await dispatch(
      updateCommunity(
        { display_name: community.display_name, description },
        community.id
      )
    );
    setDescription(data.description);
    setShowEditDescription(false);
  };

  return (
    <div className="community-page-description">
      {user?.id === community.userId && (
        <div
          onClick={() => setShowEditDescription(true)}
          className={`${
            showEditDescription
              ? "community-page-edit-description"
              : !showEditDescription && description.length === 0
              ? "add-description-box"
              : ""
          } community-page-box-description`}
        >
          {!showEditDescription && description.length === 0 ? (
            <div className="edit-community-description-add-description">
              Add description
            </div>
          ) : (
            !showEditDescription && (
              <p>
                {description} <FaPen />
              </p>
            )
          )}
          {showEditDescription && (
            <div ref={wrapperRef}>
              <textarea
                ref={textareaRef}
                id="edit-community-description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  e.target.rows = Math.min(
                    10,
                    Math.max(2, e.target.value.split("\n").length)
                  );
                }}
                placeholder={
                  description.length === 0 ? "Tell us about your community" : ""
                }
                autoFocus
                onFocus={(e) => {
                  let val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
                maxLength={500}
              ></textarea>
              <div className="edit-community-description-bar">
                <div
                  className={
                    description.length === 500
                      ? "edit-community-description-red edit-community-description-bar-left"
                      : "edit-community-description-bar-left"
                  }
                >
                  {500 - description.length} Characters remaining
                </div>
                <span
                  className="edit-community-description-cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowEditDescription(false);
                  }}
                >
                  Cancel
                </span>
                <span
                  className="edit-community-description-save"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSaveDescription();
                  }}
                >
                  Save
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {user?.id !== community.userId && (
        <div className="community-page-box-description-plain">
          {community.description}
        </div>
      )}
    </div>
  );
}
