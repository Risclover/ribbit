import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "@/store";
import { HandleClickOutside } from "@/utils";
import { useOutsideClick } from "hooks";

export function CommunityInfoMenu() {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { communityName } = useParams();
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);
  const communities = useSelector((state) => state.communities);

  const getIdFromName = (name) => {
    let result = Object.values(communities).find(
      (community) => community.name === name
    );
    return result ? result.id : null;
  };

  const [btnState, setBtnState] = useState("Add To Favorites");
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (favoriteCommunities[getIdFromName(communityName)]) {
      setBtnState("Remove From Favorites");
    } else {
      setBtnState("Add To Favorites");
    }
  }, [favoriteCommunities]);

  const handleOpenMenu = (e) => {
    e.preventDefault();
    setOpenMenu(!openMenu);
  };

  const handleFavorites = async (e, community) => {
    e.preventDefault();
    if (favoriteCommunities[getIdFromName(communityName)]) {
      await dispatch(removeFavoriteCommunity(getIdFromName(communityName)));
    } else {
      await dispatch(addFavoriteCommunity(getIdFromName(communityName)));
    }
    dispatch(getFavoriteCommunities());
    setOpenMenu(false);
  };

  useOutsideClick(wrapperRef, () => setOpenMenu(false));
  return (
    <div className="community-page-menu">
      <button onClick={handleOpenMenu}>
        <HiOutlineDotsHorizontal />
      </button>
      {openMenu && (
        <div className="community-info-menu" ref={wrapperRef}>
          <button role="menuitem" onClick={handleFavorites}>
            {btnState}
          </button>
        </div>
      )}
    </div>
  );
}
