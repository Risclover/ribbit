import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import { getCommunities, updateCommunity } from "@/store";
import { useOutsideClick, useAutosizeTextArea } from "@/hooks";
import { getSingleCommunity } from "store";

export function CommunityDescription({ community, user, isPage }) {
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState(community.description);

  const singleCommunity = useSelector(
    (state) => state.communities[community.id]
  );

  useOutsideClick(wrapperRef, () => setShowEditDescription(false));
  useAutosizeTextArea(textareaRef.current, description);

  const handleSaveDescription = async () => {
    console.log("community:", community.displayName);
    const displayName = community.displayName;
    const data = await dispatch(
      updateCommunity(
        {
          displayName,
          description,
        },
        community.id
      )
    );

    console.log('data:', data)
    setDescription(data.description);
    await dispatch(getCommunities());
    setShowEditDescription(false);
  };

  return (
    <div className="community-page-description">
      {isPage !== "singlepage" && user?.id === community.userId && (
        <div
          onClick={() => {
            setShowEditDescription(true);
            setTimeout(() => {
              const textareaBox = document.querySelector(
                "#edit-community-description"
              );
              textareaBox.style.height =
                textareaRef.current.scrollHeight + "px";
            }, 5);
          }}
          className={`${
            showEditDescription
              ? "community-page-edit-description "
              : !showEditDescription && description.length === 0
              ? "add-description-box "
              : ""
          }community-page-box-description`}
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
                <button
                  className="edit-community-description-cancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDescription(singleCommunity.description);
                    setShowEditDescription(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="edit-community-description-save"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveDescription();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {(isPage === "singlepage" || user?.id !== community.userId) && (
        <div className="community-page-box-description-plain">
          {community.description}
        </div>
      )}
    </div>
  );
}
