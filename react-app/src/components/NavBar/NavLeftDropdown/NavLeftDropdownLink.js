import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function NavLeftDropdownLink({
  favorite,
  favoriteType,
  handleFavorite,
  item,
  mode,
  setShowIcon,
}) {
  const history = useHistory();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {mode === "User" && !favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/users/${item.id}/profile`);
          }}
        >
          <img
            src={item.profile_img}
            className="nav-left-dropdown-item-img"
            alt="User"
          />
          <span className="nav-left-dropdown-item">u/{item.username}</span>
          {!favoriteType[item.id] ? (
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
        </div>
      )}

      {mode === "Community" && !favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/c/${item.id}`);
          }}
        >
          <img
            style={{
              backgroundColor: `${item.communitySettings[item.id].baseColor}`,
            }}
            src={item.communityImg}
            className="nav-left-dropdown-item-img"
            alt="Community"
          />
          <span className="nav-left-dropdown-item">c/{item.name}</span>
          {!favoriteType[item.id] ? (
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
        </div>
      )}

      {mode === "User" && favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/users/${item.id}/profile`);
          }}
        >
          <img
            src={item.profile_img}
            className="nav-left-dropdown-item-img"
            alt="User"
          />
          <span className="nav-left-dropdown-item">u/{item.username}</span>
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
        </div>
      )}

      {mode === "Community" && favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowIcon(false);
            history.push(`/c/${item.id}`);
          }}
        >
          <img
            style={{
              backgroundColor: `${item.communitySettings[item.id].baseColor}`,
            }}
            src={item.communityImg}
            className="nav-left-dropdown-item-img"
            alt="Community"
          />
          <span className="nav-left-dropdown-item">c/{item.name}</span>
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
        </div>
      )}
    </>
  );
}
