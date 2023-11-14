import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TfiPlus } from "react-icons/tfi";
import { TfiBell } from "react-icons/tfi";
import Home from "../../../assets/images/navbar/home-icon.png";
import All from "../../../assets/images/navbar/all-icon2.png";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "../../../store/favorite_communities";
import {
  addFavoriteUser,
  getFavoriteUsers,
  removeFavoriteUser,
} from "../../../store/favorite_users";
import HandleClickOutside from "../../../utils/HandleClickOutside";
import { NavLeftDropdownLink } from "./NavLeftDropdownLink";

export function NavLeftDropdown({ showIcon, setShowIcon }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const history = useHistory();

  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );
  const followers = useSelector((state) => state.followers?.follows);
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);
  const favoriteUsers = useSelector((state) => state.favoriteUsers);
  const currentUser = useSelector((state) => state.session.user);

  const [filter, setFilter] = useState("");
  const [communities, setCommunities] = useState();
  const [following, setFollowing] = useState();

  useEffect(() => {
    setCommunities(subscriptions);
    setFollowing(followers);
  }, []);

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, showIcon, setShowIcon);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, showIcon, setShowIcon);
  //     });
  //   };
  // }, [wrapperRef, setShowIcon, showIcon]);

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
    <div className="nav-left-dropdown-insides" ref={wrapperRef}>
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
            favorite={true}
            favoriteType={favoriteCommunities}
            item={item}
            mode="Community"
            setShowIcon={setShowIcon}
            handleFavorite={handleFavorite}
          />
        ))}
      {filter.length > 0 &&
        Object.values(favoriteCommunities)
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              favorite={true}
              favoriteType={favoriteCommunities}
              item={item}
              mode="Community"
              setShowIcon={setShowIcon}
              handleFavorite={handleFavorite}
            />
          ))}
      {filter === "" &&
        Object.values(favoriteUsers).map((item) => (
          <NavLeftDropdownLink
            favorite={true}
            favoriteType={favoriteUsers}
            item={item}
            mode="User"
            setShowIcon={setShowIcon}
            handleFavorite={handleUserFavorite}
          />
        ))}
      {filter.length > 0 &&
        Object.values(favoriteUsers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              favorite={true}
              favoriteType={favoriteUsers}
              item={item}
              mode="User"
              setShowIcon={setShowIcon}
              handleFavorite={handleUserFavorite}
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
            favorite={false}
            favoriteType={favoriteCommunities}
            item={item}
            mode="Community"
            setShowIcon={setShowIcon}
            handleFavorite={handleFavorite}
          />
        ))}
      {filter.length > 0 &&
        subscriptions
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              favorite={false}
              favoriteType={favoriteCommunities}
              item={item}
              mode="Community"
              setShowIcon={setShowIcon}
              handleFavorite={handleFavorite}
            />
          ))}
      {Object.values(followers).filter((item) =>
        item.username.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Following</div>}
      {filter === "" &&
        Object.values(followers).map((item) => (
          <NavLeftDropdownLink
            favorite={false}
            favoriteType={favoriteUsers}
            item={item}
            mode="User"
            handleFavorite={handleUserFavorite}
            setShowIcon={setShowIcon}
          />
        ))}
      {filter.length > 0 &&
        Object.values(followers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <NavLeftDropdownLink
              favorite={false}
              favoriteType={favoriteUsers}
              item={item}
              mode="User"
              handleFavorite={handleUserFavorite}
              setShowIcon={setShowIcon}
            />
          ))}
      {/* Don't forget to add 'Popular' back in */}
      {["Home", "All"].filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Feeds</div>}
      {"Home".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/");
          }}
        >
          <img src={Home} className="nav-left-dropdown-item-icon" alt="Home" />
          <span className="nav-left-dropdown-item">Home</span>
        </div>
      )}
      {/* {"Popular".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/");
          }}
        >
          <img src={Popular} className="nav-left-dropdown-item-icon" />
          <span className="nav-left-dropdown-item">Popular</span>
        </div>
      )} */}
      {"All".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/c/all");
          }}
        >
          <img src={All} className="nav-left-dropdown-item-icon" alt="All" />
          <span className="nav-left-dropdown-item">All</span>
        </div>
      )}
      {["User Settings", "Messages", "Notifications", "Create Post"].filter(
        (item) => item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Other</div>}
      {"User Settings".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/users/${currentUser?.id}/profile/edit`);
          }}
        >
          <img
            src={currentUser?.profile_img}
            className="nav-left-dropdown-item-img"
            alt="User Settings"
          />
          <span className="nav-left-dropdown-item">User Settings</span>
        </div>
      )}
      {"Messages".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/message/messages");
          }}
        >
          {" "}
          <img
            src={currentUser?.profile_img}
            className="nav-left-dropdown-item-img"
            alt="Messages"
          />
          <span className="nav-left-dropdown-item">Messages</span>
        </div>
      )}
      {"Create Post".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/c/submit");
          }}
        >
          <TfiPlus />
          <span className="nav-left-dropdown-item">Create Post</span>
        </div>
      )}
      {"Notifications".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/notifications");
          }}
        >
          <TfiBell />
          <span className="nav-left-dropdown-item">Notifications</span>
        </div>
      )}
    </div>
  );
}