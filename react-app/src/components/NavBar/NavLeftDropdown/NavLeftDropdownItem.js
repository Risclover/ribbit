import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function NavLeftDropdownItem({
  mode,
  favorite,
  linkPath,
  item,
}) {
  return (
    <NavLink
      to={linkPath}
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
        className="nav-left-dropdown-star"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleFavorite(e, item);
        }}
      >
        {!favoriteType[item?.id] ? (
          <BsStar />
        ) : (
          <span className="star-filled">
            <BsStarFill />
          </span>
        )}
      </div>
    </NavLink>
  );
}
