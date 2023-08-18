import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Cake from "../../images/misc/piece4.png";
import { useDispatch } from "react-redux";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "../../store/favorite_communities";
import { getSubscriptions } from "../../store/subscriptions";
import LoginSignupModal from "../../components/Modals/LoginSignupModal";
import { FaPen } from "react-icons/fa";
import useAutosizeTextArea from "../../components/Modals/ChatWindow/ChatWindowRight/ChatWindowInput/useAutosizeTextArea";
import {
  getCommunities,
  getSingleCommunity,
  updateCommunity,
} from "../../store/communities";

export default function CommunityInfoBox({
  setFavorited,
  favoriteCommunities,
  community,
  user,
}) {
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const [members, setMembers] = useState(0);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState(community.description);

  useAutosizeTextArea(textareaRef.current, description);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  const handleFavorite = async (e, community) => {
    e.preventDefault();
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
      setFavorited(false);
    } else {
      await dispatch(addFavoriteCommunity(community.id));
      setFavorited(true);
    }
    dispatch(getFavoriteCommunities());
    dispatch(getSubscriptions());
  };

  const handleSaveDescription = async () => {
    const data = await dispatch(
      updateCommunity(
        { display_name: community.display_name, description },
        community.id
      )
    );
    console.log("data:", data);
    setDescription(data.description);
    setShowEditDescription(false);
  };
  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header">
        <h3>About Community</h3>
      </div>
      <div className="community-page-box-content">
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
              <>
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
                    description.length === 0
                      ? "Tell us about your community"
                      : ""
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
              </>
            )}
          </div>
        )}
        {user?.id !== community.userId && (
          <div className="community-page-box-description-plain">
            {community.description}
          </div>
        )}
        <div className="community-page-box-date">
          <img src={Cake} className="community-cake-icon" alt="Cake" />
          Created {moment(new Date(community.createdAt)).format("MMM DD, YYYY")}
        </div>
        <div className="community-page-box-members">
          <h2>{members}</h2>
          <span>{members === 1 ? "Member" : "Members"}</span>
        </div>
        <div className="community-page-box-btn">
          {user && (
            <NavLink to={`/c/${community.id}/submit`}>
              <button className="blue-btn-filled btn-long">Create Post</button>
            </NavLink>
          )}
          {user && (
            <button
              className={
                favoriteCommunities[community.id]
                  ? "blue-btn-unfilled btn-long"
                  : "blue-btn-filled btn-long"
              }
              onClick={(e) => handleFavorite(e, community)}
            >
              {favoriteCommunities[community.id]
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          )}

          {!user && (
            <LoginSignupModal
              btnText="Log In/Sign Up"
              className="blue-btn-filled btn-long"
            />
          )}

          {user?.id === community.userId ? (
            <NavLink to={`/c/${community.id}/edit`}>
              <button className="blue-btn-unfilled btn-long">
                Edit Community
              </button>
            </NavLink>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
