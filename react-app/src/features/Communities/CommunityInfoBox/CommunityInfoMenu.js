import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
} from "../../../store/favorite_communities";
import { HandleClickOutside } from "../../../utils";

export function CommunityInfoMenu() {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const favoriteCommunities = useSelector((state) => state.favoriteCommunities);

  const [btnState, setBtnState] = useState("Add To Favorites");
  const [openMenu, setOpenMenu] = useState(false);

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

  const handleFavorites = (e) => {
    e.preventDefault();

    if (favoriteCommunities[communityId]) {
      dispatch(removeFavoriteCommunity(communityId));
      dispatch(getFavoriteCommunities());
      setBtnState("Remove From Favorites");
    }

    if (!favoriteCommunities[communityId]) {
      dispatch(addFavoriteCommunity(communityId));
      dispatch(getFavoriteCommunities());
      setBtnState("Add To Favorites");
    }
    setOpenMenu(false);
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, openMenu, setOpenMenu);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, openMenu, setOpenMenu);
  //     });
  //   };
  // }, [wrapperRef, openMenu]);

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
