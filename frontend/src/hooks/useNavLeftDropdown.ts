import { useState } from "react";
import {
  useIsSmallScreen,
  useDropdownSelectors,
  useFavoriteToggles,
  useDropdownSections,
} from "@/hooks";
import { useSelector } from "react-redux";

export function useNavLeftDropdown(closeDropdown, setShowNavSidebar) {
  /* local filter state */
  const [filter, setFilter] = useState("");

  /* derived flags + data */
  const isSmallScreen = useIsSmallScreen(768);
  const lists = useDropdownSelectors();
  const favoriteCommunitiesById = useSelector(
    (s) => s.favoriteCommunities || {}
  );
  const favoriteUsersById = useSelector((s) => s.favoriteUsers || {});
  const currentUser = useSelector((s) => s.session.user);

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
    setShowNavSidebar,
  });

  /* API for the dropdown view */
  return { filter, setFilter, sections };
}
