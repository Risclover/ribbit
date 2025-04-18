import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { TfiBell } from "react-icons/tfi";

import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
  addFavoriteUser,
  getFavoriteUsers,
  removeFavoriteUser,
} from "@/store";

import { NavLeftDropdownLink } from "./NavLeftDropdownLink";
import All from "@/assets/images/navbar/all-icon2.png";
import Home from "@/assets/images/navbar/home-icon.png";
import { getSubscriptions } from "@/store";
import { CreatePostIcon } from "@/assets/icons/CreatePostIcon";
import { AllPostsIcon, HomeIcon } from "@/assets";

export function NavLeftDropdown({ setShowIcon, setShowDropdown }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );
  const followers = useSelector((state) => state.followers?.follows);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);
  const favoriteUsers = useSelector((state) => state.favoriteUsers);
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[currentUser?.id]);

  const [filter, setFilter] = useState("");
  const [communities, setCommunities] = useState();
  const [following, setFollowing] = useState();

  useEffect(() => {
    setCommunities(subscriptions);
    setFollowing(followers);
  }, []);

  Object.values(favoriteCommunities).sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  subscriptions.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  if (
    followers &&
    Object.values(followers) &&
    Object.values(followers).length > 0
  ) {
    Object.values(followers)?.sort((a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
    );
  }

  useEffect(() => {
    if (filter.length > 0) {
      setCommunities(
        communities.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else if (filter === "") {
      let sorted = Object.values(favoriteCommunities).sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      setCommunities(sorted);
    }
  }, [filter, favoriteCommunities]);

  const handleFavorite = async (e, community) => {
    e.preventDefault();
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
    } else {
      await dispatch(addFavoriteCommunity(community.id));
    }
    dispatch(getFavoriteCommunities());
  };

  const handleUserFavorite = async (e, user) => {
    e.preventDefault();
    if (favoriteUsers[user.id]) {
      await dispatch(removeFavoriteUser(user.id));
    } else {
      await dispatch(addFavoriteUser(user.id));
    }
    dispatch(getFavoriteUsers());
  };

  if (!followers || !communities || !following) return null;

  return (
    <div className="nav-left-dropdown-insides">
      <input
        className="nav-left-dropdown-filter"
        type="text"
        placeholder="Filter"
        value={filter}
        autoFocus
        onChange={(e) => setFilter(e.target.value)}
      />
      {(Object.values(favoriteCommunities).length > 0 ||
        Object.values(favoriteUsers).length > 0) &&
        (Object.values(favoriteCommunities).filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        ).length > 0 ||
          Object.values(favoriteUsers).filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          ).length > 0) && (
          <div className="nav-left-dropdown-title">Favorites</div>
        )}
      {filter === "" &&
        Object.values(favoriteCommunities).map((item) => (
          <NavLeftDropdownLink
            key={item.id}
            favorite={true}
            favoriteType={favoriteCommunities}
            item={item}
            mode="Community"
            setShowIcon={setShowIcon}
            handleFavorite={handleFavorite}
            setShowDropdown={setShowDropdown}
          />
        ))}
      {filter.length > 0 &&
        Object.values(favoriteCommunities)
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              key={item.id}
              favorite={true}
              favoriteType={favoriteCommunities}
              item={item}
              mode="Community"
              setShowIcon={setShowIcon}
              handleFavorite={handleFavorite}
              setShowDropdown={setShowDropdown}
            />
          ))}
      {filter === "" &&
        Object.values(favoriteUsers).map((item) => (
          <NavLeftDropdownLink
            key={item.id}
            favorite={true}
            favoriteType={favoriteUsers}
            item={item}
            mode="User"
            setShowIcon={setShowIcon}
            handleFavorite={handleUserFavorite}
            setShowDropdown={setShowDropdown}
          />
        ))}
      {filter.length > 0 &&
        Object.values(favoriteUsers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              key={item.id}
              favorite={true}
              favoriteType={favoriteUsers}
              item={item}
              mode="User"
              setShowIcon={setShowIcon}
              handleFavorite={handleUserFavorite}
              setShowDropdown={setShowDropdown}
            />
          ))}
      {subscriptions.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && (
        <div className="nav-left-dropdown-title">Your Communities</div>
      )}
      {filter === "" &&
        subscriptions.map((item) => (
          <NavLeftDropdownLink
            key={item.id}
            favorite={false}
            favoriteType={favoriteCommunities}
            item={item}
            mode="Community"
            setShowIcon={setShowIcon}
            handleFavorite={handleFavorite}
            setShowDropdown={setShowDropdown}
          />
        ))}
      {filter.length > 0 &&
        subscriptions
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              key={item.id}
              favorite={false}
              favoriteType={favoriteCommunities}
              item={item}
              mode="Community"
              setShowIcon={setShowIcon}
              handleFavorite={handleFavorite}
              setShowDropdown={setShowDropdown}
            />
          ))}
      {Object.values(followers).filter((item) =>
        item.username.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Following</div>}
      {filter === "" &&
        Object.values(followers).map((item) => (
          <NavLeftDropdownLink
            key={item.id}
            favorite={false}
            favoriteType={favoriteUsers}
            item={item}
            mode="User"
            handleFavorite={handleUserFavorite}
            setShowIcon={setShowIcon}
            setShowDropdown={setShowDropdown}
          />
        ))}
      {filter.length > 0 &&
        Object.values(followers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              key={item.id}
              favorite={false}
              favoriteType={favoriteUsers}
              item={item}
              mode="User"
              handleFavorite={handleUserFavorite}
              setShowIcon={setShowIcon}
              setShowDropdown={setShowDropdown}
            />
          ))}
      {/* Don't forget to add 'Popular' back in */}
      {["Home", "All"].filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Feeds</div>}
      {"Home".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          className="nav-left-dropdown-navitem"
          to="/"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
        >
          <HomeIcon />
          <span className="nav-left-dropdown-item">Home</span>
        </NavLink>
      )}

      {"All".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          className="nav-left-dropdown-navitem"
          to="/all"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
        >
          <AllPostsIcon />
          <span className="nav-left-dropdown-item">All</span>
        </NavLink>
      )}
      {["User Settings", "Messages", "Notifications", "Create Post"].filter(
        (item) => item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Other</div>}
      {"User Settings".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
          to={`/settings/profile`}
        >
          <img
            src={currentUser?.profileImg}
            className="nav-left-dropdown-item-img"
            alt="User Settings"
          />
          <span className="nav-left-dropdown-item">User Settings</span>
        </NavLink>
      )}
      {"Messages".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          to="/message/messages"
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
        >
          {" "}
          <img
            src={currentUser?.profileImg}
            className="nav-left-dropdown-item-img"
            alt="Messages"
          />
          <span className="nav-left-dropdown-item">Messages</span>
        </NavLink>
      )}
      {"Create Post".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
          to="/submit"
        >
          <CreatePostIcon />
          <span className="nav-left-dropdown-item">Create Post</span>
        </NavLink>
      )}
      {"Notifications".toLowerCase().includes(filter.toLowerCase()) && (
        <NavLink
          to="/notifications"
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowIcon(false);
            setShowDropdown(false);
          }}
        >
          <TfiBell />
          <span className="nav-left-dropdown-item">Notifications</span>
        </NavLink>
      )}
    </div>
  );
}
