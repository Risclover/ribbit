import React from "react";
import { NavLink } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CommunityImg } from "@/components/CommunityImg";

/**
 * Renders a single link in the dropdown:
 * - Either for a Community or for a User
 * - Shows a star toggle if the user/community can be favorited
 */
export function NavLeftDropdownLink({
  item,
  mode, // "User" or "Community"
  favoriteType,
  handleFavorite,
  setShowDropdown,
  setShowIcon,
}) {
  if (!item) return null;

  const isFavorite = Boolean(favoriteType[item.id]);
  const isUser = mode === "User";

  const linkPath = isUser ? `/users/${item.id}/profile` : `/c/${item.name}`;
  const displayName = isUser ? `u/${item.username}` : `c/${item.name}`;
  const altText = isUser ? "User" : "Community";

  // Close dropdown on navigation
  const handleNavClick = () => {
    setShowDropdown(false);
    setShowIcon(false);
  };

  // Toggle star
  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFavorite(e, item);
  };

  return (
    <NavLink
      to={linkPath}
      className="nav-left-dropdown-navitem"
      onClick={handleNavClick}
    >
      {isUser ? (
        <img
          src={item.profileImg}
          className="nav-left-dropdown-item-img"
          alt={altText}
        />
      ) : (
        <CommunityImg
          imgStyle={{
            backgroundColor: item?.communitySettings?.[item.id]?.baseColor,
          }}
          imgSrc={item?.communitySettings?.[item.id]?.communityIcon}
          imgClass="nav-left-dropdown-item-img"
          imgAlt={altText}
        />
      )}

      <span className="nav-left-dropdown-item">{displayName}</span>

      <div
        className={`nav-left-dropdown-star ${isFavorite ? "star-filled" : ""}`}
        tabIndex={0}
        onClick={handleStarClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleStarClick(e);
          }
        }}
      >
        {isFavorite ? <BsStarFill /> : <BsStar />}
      </div>
    </NavLink>
  );
}
