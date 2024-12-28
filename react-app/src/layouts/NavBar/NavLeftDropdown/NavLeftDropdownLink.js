import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CommunityImg } from "components/CommunityImg";

export function NavLeftDropdownLink({
  favorite,
  favoriteType,
  handleFavorite,
  item,
  mode,
  setShowDropdown,
}) {
  const history = useHistory();
  if (!item) return null;
  return (
    <>
      {mode === "User" && !favorite && (
        <NavLink
          to={`/users/${item?.id}/profile`}
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <img
            src={item?.profileImg}
            className="nav-left-dropdown-item-img"
            alt="User"
          />
          <span className="nav-left-dropdown-item">u/{item?.username}</span>
          {!favoriteType[item?.id] ? (
            <div
              className="nav-left-dropdown-star"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFavorite(e, item);
              }}
            >
              <BsStar />
            </div>
          ) : (
            <div
              className="nav-left-dropdown-star star-filled"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFavorite(e, item);
              }}
            >
              <BsStarFill />
            </div>
          )}
        </NavLink>
      )}

      {mode === "Community" && !favorite && (
        <NavLink
          className="nav-left-dropdown-navitem"
          to={`/c/${item?.name}`}
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <CommunityImg
            imgStyle={{
              backgroundColor: `${item?.communitySettings[item?.id].baseColor}`,
            }}
            imgSrc={item?.communitySettings[item?.id].communityIcon}
            imgClass="nav-left-dropdown-item-img"
            imgAlt="Community"
          />
          <span className="nav-left-dropdown-item">c/{item?.name}</span>
          {!favoriteType[item?.id] ? (
            <div
              className="nav-left-dropdown-star"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFavorite(e, item);
              }}
            >
              <BsStar />
            </div>
          ) : (
            <div
              className="nav-left-dropdown-star star-filled"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavorite(e, item);
              }}
            >
              <BsStarFill />
            </div>
          )}
        </NavLink>
      )}

      {mode === "User" && favorite && (
        <NavLink
          to={`/users/${item?.id}/profile`}
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <img
            src={item?.profileImg}
            className="nav-left-dropdown-item-img"
            alt="User"
          />
          <span className="nav-left-dropdown-item">u/{item?.username}</span>
          <div
            className="nav-left-dropdown-star star-filled"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFavorite(e, item);
            }}
          >
            <BsStarFill />
          </div>
        </NavLink>
      )}

      {mode === "Community" && favorite && (
        <NavLink
          to={`/c/${item?.name}`}
          className="nav-left-dropdown-navitem"
          onClick={() => {
            setShowDropdown(false);
          }}
        >
          <CommunityImg
            imgStyle={{
              backgroundColor: `${item?.communitySettings[item?.id].baseColor}`,
            }}
            imgSrc={item?.communitySettings[item?.id].communityIcon}
            imgClass="nav-left-dropdown-item-img"
            imgAlt="Community"
          />
          <span className="nav-left-dropdown-item">c/{item?.name}</span>
          <div
            className="nav-left-dropdown-star star-filled"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFavorite(e, item);
            }}
          >
            <BsStarFill />
          </div>
        </NavLink>
      )}
    </>
  );
}
