import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getSubscriptions } from "../../../store/subscriptions";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { TfiPlus } from "react-icons/tfi";
import { getFollowers, getUserFollowers } from "../../../store/followers";
import Home from "../../../images/navbar/home-icon.png";
import All from "../../../images/navbar/all-icon2.png";
import Popular from "../../../images/navbar/popular.png";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "../../../store/favorite_communities";
import {
  addFavoriteUser,
  favoriteUser,
  getFavoriteUsers,
  removeFavoriteUser,
} from "../../../store/favorite_users";

export default function NavLeftDropdown({ setShowIcon }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );

  const followers = useSelector((state) => state.followers?.follows);

  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);
  const favoriteUsers = useSelector((state) => state.favoriteUsers);

  const currentUser = useSelector((state) => state.session.user);
  const [favorites, setFavorites] = useState();
  const [communities, setCommunities] = useState();
  const [following, setFollowing] = useState();
  const [final, setFinal] = useState();

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getUserFollowers(currentUser.id));
    dispatch(getFollowers());
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
  }, [dispatch]);

  useEffect(() => {
    setCommunities(subscriptions);
    setFollowing(followers);
    setFavorites(Object.values(favoriteCommunities));
  }, []);

  Object.values(favoriteCommunities).sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  subscriptions.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  Object.values(followers)?.sort((a, b) =>
    a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
  );
  console.log("f:", Object.values(followers));

  const handleFavorite = async (e, community) => {
    e.preventDefault();
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
      dispatch(getFavoriteCommunities());
      setFinal(Object.values(favoriteCommunities));
      console.log("favorites:", favorites);
    } else {
      await dispatch(addFavoriteCommunity(community.id));
      dispatch(getFavoriteCommunities());
      setFinal(Object.values(favoriteCommunities));
      console.log("favorites:", favorites);
    }
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

  useEffect(() => {
    if (filter.length > 0) {
      setCommunities(
        communities.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
      setFinal(
        Object.values(favoriteCommunities).filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else if (filter === "") {
      let sorted = Object.values(favoriteCommunities).sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      setFinal(sorted);
      setCommunities(sorted);
    }
  }, [filter]);

  console.log("filter:", filter);

  if (!followers || !communities || !following) return null;
  return (
    <div className="nav-left-dropdown">
      <input
        className="nav-left-dropdown-filter"
        type="text"
        placeholder="Filter"
        value={filter}
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
          <div className="nav-left-dropdown-navitem">
            <div
              className="nav-left-dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                setShowIcon(false);
                history.push(`/c/${item.id}`);
              }}
            >
              <img
                src={item.communityImg}
                className="nav-left-dropdown-item-img"
              />
              <span className="nav-left-dropdown-item">c/{item.name}</span>
            </div>

            <div
              className="nav-left-dropdown-star star-filled"
              onClick={(e) => {
                handleFavorite(e, item);
              }}
            >
              <BsStarFill />
            </div>
          </div>
        ))}
      {filter === "" &&
        Object.values(favoriteUsers).map((item) => (
          <div className="nav-left-dropdown-navitem">
            <div
              className="nav-left-dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                setShowIcon(false);
                history.push(`/users/${item.id}/profile`);
              }}
            >
              <img
                src={item.profile_img}
                className="nav-left-dropdown-item-img"
              />
              <span className="nav-left-dropdown-item">u/{item.username}</span>
            </div>

            <div
              className="nav-left-dropdown-star star-filled"
              onClick={(e) => {
                handleUserFavorite(e, item);
              }}
            >
              <BsStarFill />
            </div>
          </div>
        ))}
      {filter.length > 0 &&
        Object.values(favoriteCommunities)
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <div className="nav-left-dropdown-navitem">
              <div
                className="nav-left-dropdown-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowIcon(false);
                  history.push(`/c/${item.id}`);
                }}
              >
                <img
                  src={item.communityImg}
                  className="nav-left-dropdown-item-img"
                />
                <span className="nav-left-dropdown-item">c/{item.name}</span>
              </div>
              <div
                className="nav-left-dropdown-star star-filled"
                onClick={(e) => handleFavorite(e, item)}
              >
                <BsStarFill />
              </div>
            </div>
          ))}
      {filter.length > 0 &&
        Object.values(favoriteUsers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <div className="nav-left-dropdown-navitem">
              <div
                className="nav-left-dropdown-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowIcon(false);
                  history.push(`/users/${item.id}/profile`);
                }}
              >
                <img
                  src={item.profile_img}
                  className="nav-left-dropdown-item-img"
                />
                <span className="nav-left-dropdown-item">
                  c/{item.username}
                </span>
              </div>
              <div
                className="nav-left-dropdown-star star-filled"
                onClick={(e) => handleUserFavorite(e, item)}
              >
                <BsStarFill />
              </div>
            </div>
          ))}
      {subscriptions.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && (
        <div className="nav-left-dropdown-title">Your Communities</div>
      )}
      {filter === "" &&
        subscriptions.map((item) => (
          <div className="nav-left-dropdown-navitem">
            <div
              className="nav-left-dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                setShowIcon(false);
                history.push(`/c/${item.id}`);
              }}
            >
              <img
                src={item.communityImg}
                className="nav-left-dropdown-item-img"
              />
              <span className="nav-left-dropdown-item">c/{item.name}</span>
            </div>
            {!favoriteCommunities[item.id] ? (
              <div
                className="nav-left-dropdown-star"
                onClick={(e) => handleFavorite(e, item)}
              >
                <BsStar />
              </div>
            ) : (
              <div
                className="nav-left-dropdown-star star-filled"
                onClick={(e) => handleFavorite(e, item)}
              >
                <BsStarFill />
              </div>
            )}
          </div>
        ))}
      {filter.length > 0 &&
        subscriptions
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <div className="nav-left-dropdown-navitem">
              <div
                className="nav-left-dropdown-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowIcon(false);
                  history.push(`/c/${item.id}`);
                }}
              >
                <img
                  src={item.communityImg}
                  className="nav-left-dropdown-item-img"
                />
                <span className="nav-left-dropdown-item">c/{item.name}</span>
              </div>
              {!favoriteCommunities[item.id] ? (
                <div
                  className="nav-left-dropdown-star"
                  onClick={(e) => handleFavorite(e, item)}
                >
                  <BsStar />
                </div>
              ) : (
                <div
                  className="nav-left-dropdown-star star-filled"
                  onClick={(e) => handleFavorite(e, item)}
                >
                  <BsStarFill />
                </div>
              )}
            </div>
          ))}
      {Object.values(followers).filter((item) =>
        item.username.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Following</div>}
      {filter === "" &&
        Object.values(followers).map((item) => (
          <div className="nav-left-dropdown-navitem">
            <div
              className="nav-left-dropdown-item-link"
              onClick={(e) => {
                e.preventDefault();
                setShowIcon(false);
                history.push(`/users/${item.id}/profile`);
              }}
            >
              <img
                src={item.profile_img}
                className="nav-left-dropdown-item-img"
              />
              <span className="nav-left-dropdown-item">u/{item.username}</span>
            </div>
            {!favoriteUsers[item.id] ? (
              <div
                className="nav-left-dropdown-star"
                onClick={(e) => handleUserFavorite(e, item)}
              >
                <BsStar />
              </div>
            ) : (
              <div
                className="nav-left-dropdown-star star-filled"
                onClick={(e) => handleUserFavorite(e, item)}
              >
                <BsStarFill />
              </div>
            )}
          </div>
        ))}
      {filter.length > 0 &&
        Object.values(followers)
          .filter((item) =>
            item.username.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item) => (
            <div className="nav-left-dropdown-navitem">
              <div
                className="nav-left-dropdown-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowIcon(false);
                  history.push(`/users/${item.id}/profile`);
                }}
              >
                <img
                  src={item.profile_img}
                  className="nav-left-dropdown-item-img"
                />
                <span className="nav-left-dropdown-item">
                  u/{item.username}
                </span>
              </div>
              {!favoriteUsers[item.id] ? (
                <div
                  className="nav-left-dropdown-star"
                  onClick={(e) => handleUserFavorite(e, item)}
                >
                  <BsStar />
                </div>
              ) : (
                <div
                  className="nav-left-dropdown-star star-filled"
                  onClick={(e) => handleUserFavorite(e, item)}
                >
                  <BsStarFill />
                </div>
              )}
            </div>
          ))}
      {["Home", "Popular", "All"].filter((item) =>
        item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Feeds</div>}
      {"Home".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/");
          }}
        >
          <img src={Home} className="nav-left-dropdown-item-icon" />
          <span className="nav-left-dropdown-item">Home</span>
        </div>
      )}
      {"Popular".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/");
          }}
        >
          <img src={Popular} className="nav-left-dropdown-item-icon" />
          <span className="nav-left-dropdown-item">Popular</span>
        </div>
      )}
      {"All".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/c/all");
          }}
        >
          <img src={All} className="nav-left-dropdown-item-icon" />
          <span className="nav-left-dropdown-item">All</span>
        </div>
      )}
      {["User Settings", "Messages", "Create Post", "Notifications"].filter(
        (item) => item.toLowerCase().includes(filter.toLowerCase())
      ).length > 0 && <div className="nav-left-dropdown-title">Other</div>}
      {"User Settings".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/users/${currentUser.id}/profile/edit`);
          }}
        >
          <img
            src={currentUser.profile_img}
            className="nav-left-dropdown-item-img"
          />
          <span className="nav-left-dropdown-item">User Settings</span>
        </div>
      )}
      {"Messages".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/users/${currentUser.id}/profile/edit`);
          }}
        >
          {" "}
          <img
            src={currentUser.profile_img}
            className="nav-left-dropdown-item-img"
          />
          <span className="nav-left-dropdown-item">Messages</span>
        </div>
      )}
      {"Create Post".toLowerCase().includes(filter.toLowerCase()) && (
        <div
          className="nav-left-dropdown-item-link"
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
          className="nav-left-dropdown-item-link"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push("/c/submit");
          }}
        >
          <FaRegBell />
          <span className="nav-left-dropdown-item">Notifications</span>
        </div>
      )}
    </div>
  );
}
