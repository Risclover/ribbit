import { useMemo } from "react";
import { useSelector } from "react-redux";

const alpha = (k) => (a, b) => a[k].toLowerCase() > b[k].toLowerCase() ? 1 : -1;

/** Grabs Redux slices and returns memo-sorted arrays */
export function useDropdownSelectors() {
  const subs = useSelector((s) => s.subscriptions);
  const follows = useSelector((s) => s.followers?.follows || {});
  const favComs = useSelector((s) => s.favoriteCommunities || {});
  const favUsers = useSelector((s) => s.favoriteUsers || {});

  return useMemo(() => {
    const list = Object.values;
    return {
      subscriptions: list(subs).sort(alpha("name")),
      followers: list(follows).sort(alpha("username")),
      favoriteCommunities: list(favComs).sort(alpha("name")),
      favoriteUsers: list(favUsers).sort(alpha("username")),
    };
  }, [subs, follows, favComs, favUsers]);
}
