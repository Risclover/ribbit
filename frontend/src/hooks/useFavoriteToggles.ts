import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import {
  addFavoriteCommunity,
  removeFavoriteCommunity,
  getFavoriteCommunities,
  addFavoriteUser,
  removeFavoriteUser,
  getFavoriteUsers,
} from "@/store";

export function useFavoriteToggles(favoriteCommunitiesById, favoriteUsersById) {
  const dispatch = useAppDispatch();

  const toggleCommunity = useCallback(
    async (id) => {
      if (favoriteCommunitiesById[id]) {
        await dispatch(removeFavoriteCommunity(id));
      } else {
        await dispatch(addFavoriteCommunity(id));
      }
      dispatch(getFavoriteCommunities());
    },
    [dispatch, favoriteCommunitiesById]
  );

  const toggleUser = useCallback(
    async (id) => {
      if (favoriteUsersById[id]) {
        await dispatch(removeFavoriteUser(id));
      } else {
        await dispatch(addFavoriteUser(id));
      }
      dispatch(getFavoriteUsers());
    },
    [dispatch, favoriteUsersById]
  );

  return { toggleCommunity, toggleUser };
}
