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
import { addToSubscriptions } from "store";
import { getCommunities } from "store";
import { getSubscriptions } from "store";

export function CommunityInfoMenu({ community }) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { communityName } = useParams();
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const communities = useSelector((state) => state.communities);

  const [btnState, setBtnState] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const communityId = getIdFromName(communityName, communities);

  useEffect(() => {
    if (favoriteCommunities[community.id]) {
      setBtnState("Remove From Favorites");
    } else {
      setBtnState("Add To Favorites");
    }
  }, [favoriteCommunities]);

  const handleOpenMenu = (e) => {
    e.preventDefault();
    setOpenMenu(!openMenu);
  };

  const handleFavorites = async (e) => {
    e.preventDefault();
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
    } else {
      await dispatch(addFavoriteCommunity(community.id));
    }
    dispatch(getFavoriteCommunities());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
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
