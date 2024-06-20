import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "@/store";
import { useOutsideClick } from "hooks";
import { getIdFromName } from "utils/getCommunityIdFromName";

export function CommunityInfoMenu() {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { communityName } = useParams();
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const communities = useSelector((state) => state.communities);

  const [btnState, setBtnState] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const communityId = getIdFromName(communityName, communities);

  useEffect(() => {
    if (favoriteCommunities[communityId]) {
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
    if (favoriteCommunities[communityId]) {
      await dispatch(removeFavoriteCommunity(communityId));
    } else {
      await dispatch(addFavoriteCommunity(communityId));
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
