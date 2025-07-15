import { useState } from "react";
import {
  useIsSmallScreen,
  useDropdownSelectors,
  useFavoriteToggles,
  useDropdownSections,
} from "@/hooks";
import { useAppSelector } from "@/store";

export function useNavLeftDropdown(closeDropdown) {
  /* local filter state */
  const [filter, setFilter] = useState("");

  /* derived flags + data */
  const isSmallScreen = useIsSmallScreen(768);
  const lists = useDropdownSelectors();
  const favoriteCommunitiesById = useAppSelector(
    (s) => s.favoriteCommunities || {}
  );
  const favoriteUsersById = useAppSelector((s) => s.favoriteUsers || {});
  const currentUser = useAppSelector((s) => s.session.user);

  /* favorite toggle callbacks */
  const { toggleCommunity, toggleUser } = useFavoriteToggles(
    favoriteCommunitiesById,
    favoriteUsersById
  );

  /* heavy work: build the sections array */
  const sections = useDropdownSections({
    lists,
    currentUser,
    isSmallScreen,
    filter,
    favoriteCommunitiesById,
    favoriteUsersById,
    toggleFavoriteCommunity: toggleCommunity,
    toggleFavoriteUser: toggleUser,
    closeDropdown,

    /* ✅ add minimal defaults */
    createCommunityButtonRow: null, // or a <button …> node when you implement it
    resourcesRows: [], // empty until you have “Resources” rows
  });

  /* API for the dropdown view */
  return { filter, setFilter, sections };
}
