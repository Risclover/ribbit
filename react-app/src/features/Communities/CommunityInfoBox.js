import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/AuthModal/LoginForm";
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

export default function CommunityInfoBox({
  setFavorited,
  favoriteCommunities,
  community,
  user,
}) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(0);

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

  return (
    <div className="community-page-community-info">
      <div className="community-page-box-header">
        <h3>About Community</h3>
      </div>
      <div className="community-page-box-content">
        <div className="community-page-box-description">
          <p>{community.description}</p>
        </div>
        <div className="community-page-box-date">
          <img src={Cake} className="community-cake-icon" />
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
