import { useMemo } from "react";
import { useAppSelector } from "@/store";

const alpha = (k) => (a, b) => a[k].toLowerCase() > b[k].toLowerCase() ? 1 : -1;

/** Grabs Redux slices and returns memo-sorted arrays */
export function useDropdownSelectors() {
  const subs = useAppSelector((s) => s.subscriptions.subscriptions);
  const communities = useAppSelector((s) => s.communities);
  const follows = useAppSelector((s) => s.followers?.follows || {});
  const favComs = useAppSelector((s) => s.favoriteCommunities || {});
  const favUsers = useAppSelector((s) => s.favoriteUsers || {});

  return useMemo(() => {
    const list = Object.values;
    return {
      subscriptions: subs
        .map((id) => communities[id])
        .filter(Boolean) // in case a community isn't loaded yet
        .sort(alpha("name")),
      followers: list(follows).sort(alpha("username")),
      favoriteCommunities: list(favComs).sort(alpha("name")),
      favoriteUsers: list(favUsers).sort(alpha("username")),
    };
  }, [subs, follows, favComs, favUsers]);
}
