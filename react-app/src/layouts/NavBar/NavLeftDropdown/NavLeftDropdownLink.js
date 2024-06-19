import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CommunityImg } from "components/CommunityImg";

export function NavLeftDropdownLink({
  favorite,
  favoriteType,
  handleFavorite,
  item,
  mode,
  setShowIcon,
  setShowDropdown,
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

  if (!item) return null;

  return (
    <>
      {mode === "User" && !favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();

            setShowDropdown(false);
            history.push(`/users/${item?.id}/profile`);
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
        </div>
      )}

      {mode === "Community" && !favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowDropdown(false);
            history.push(`/c/${item?.name}`);
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
        </div>
      )}

      {mode === "User" && favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowDropdown(false);
            history.push(`/users/${item?.id}/profile`);
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
        </div>
      )}

      {mode === "Community" && favorite && (
        <div
          className="nav-left-dropdown-navitem"
          onClick={(e) => {
            e.preventDefault();
            setShowDropdown(false);
            history.push(`/c/${item?.name}`);
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
        </div>
      )}
    </>
  );
}
