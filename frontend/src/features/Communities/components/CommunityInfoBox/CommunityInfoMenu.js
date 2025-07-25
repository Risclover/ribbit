import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useHistory, useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useOutsideClick } from "@/hooks";
import {
  addFavoriteCommunity,
  getFavoriteCommunities,
  removeFavoriteCommunity,
  getCommunities,
  getSubscriptions,
} from "@/store";
import { getIdFromName } from "@/utils";
import { BiShieldAlt } from "react-icons/bi";
import { useIsMobile } from "hooks/useIsMobile";

export function CommunityInfoMenu({ community }) {
  const wrapperRef = useRef(null);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { communityName } = useParams();
  const favoriteCommunities = useAppSelector(
    (state) => state.favoriteCommunities
  );

  const communities = useAppSelector((state) => state.communities.communities);

  const [btnState, setBtnState] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const currentUser = useAppSelector((state) => state.session.user);

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
    setOpenMenu((prev) => !prev);
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
    <div className="community-page-menu" ref={wrapperRef}>
      <button
        aria-label="Menu"
        onClick={handleOpenMenu}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleOpenMenu(e);
        }}
      >
        <HiOutlineDotsHorizontal />
      </button>
      {openMenu && (
        <div className="community-info-menu">
          {currentUser?.id === community?.userId && (
            <button
              className="community-page-mod-tools"
              onClick={() => history.push(`/c/${community?.name}/edit`)}
            >
              <BiShieldAlt /> Mod Tools
            </button>
          )}

          <button
            role="menuitem"
            onClick={handleFavorites}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFavorites(e);
              }
            }}
          >
            {btnState}
          </button>
        </div>
      )}
    </div>
  );
}
