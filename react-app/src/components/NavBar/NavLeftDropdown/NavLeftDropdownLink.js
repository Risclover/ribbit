import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../../store/users";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function NavLeftDropdownLink({
  favorite,
  favoriteType,
  handleFavorite,
  handleUserFavorite,
  item,
  mode,
  setShowIcon,
}) {
  const dispatch = useDispatch;
  const history = useHistory();

  return (
    <>
      {mode === "User" && !favorite && (
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
          {!favoriteType[item.id] ? (
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
      )}
      {mode === "Community" && !favorite && (
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
          {!favoriteType[item.id] ? (
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
      )}
      {mode === "User" && favorite && (
        <div className="nav-left-dropdown-navitem">
          <div
            className="nav-left-dropdown-item-link"
            onClick={async (e) => {
              e.preventDefault();
              setShowIcon(false);
              history.push(`/users/${item.id}/profile`);
              await dispatch(getUsers());
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
      )}
      {mode === "Community" && favorite && (
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
      )}
    </>
  );
}
