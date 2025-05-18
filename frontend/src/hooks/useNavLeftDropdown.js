import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TfiBell } from "react-icons/tfi";

import {
  addFavoriteCommunity,
  removeFavoriteCommunity,
  getFavoriteCommunities,
  addFavoriteUser,
  removeFavoriteUser,
  getFavoriteUsers,
} from "@/store";

import { NavLeftDropdownLink } from "components";
import { HomeIcon, AllPostsIcon } from "@/assets";
import { CreatePostIcon } from "@/assets/icons/CreatePostIcon";

/* alphabetical sort helper */
const alphaSort = (key) => (a, b) =>
  a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;

/**
 * Provides everything the NavLeftDropdown view needs:
 *   – filter state
 *   – pre-sorted / filtered lists
 *   – favourite toggle callbacks
 *   – pre-built `sections` array for rendering
 */
export function useNavLeftDropdown(closeDropdown) {
  const dispatch = useDispatch();
  const subscriptions = useSelector((s) => s.subscriptions);
  const followersMap = useSelector((s) => s.followers?.follows || {});
  const favoriteCommunitiesMap = useSelector(
    (s) => s.favoriteCommunities || {}
  );
  const favoriteUsersMap = useSelector((s) => s.favoriteUsers || {});
  const currentUser = useSelector((s) => s.session.user);
 
  /* ------------- local filter text ------------- */
  const [filter, setFilter] = useState("");
  const filterText = filter.trim().toLowerCase();
  const matchesFilter = (key) => (item) =>
    !filterText || item[key].toLowerCase().includes(filterText);

  /* ------------- memoised, sorted arrays ------------- */
  const lists = useMemo(() => {
    const toArray = Object.values;
    return {
      subscriptions: toArray(subscriptions).sort(alphaSort("name")),
      followers: toArray(followersMap).sort(alphaSort("username")),
      favoriteCommunities: toArray(favoriteCommunitiesMap).sort(
        alphaSort("name")
      ),
      favoriteUsers: toArray(favoriteUsersMap).sort(alphaSort("username")),
    };
  }, [subscriptions, followersMap, favoriteCommunitiesMap, favoriteUsersMap]);

  /* ------------- favourite mutators ------------- */
  const toggleFavoriteCommunity = useCallback(
    async (communityId) => {
      if (favoriteCommunitiesMap[communityId]) {
        await dispatch(removeFavoriteCommunity(communityId));
      } else {
        await dispatch(addFavoriteCommunity(communityId));
      }
      dispatch(getFavoriteCommunities());
    },
    [dispatch, favoriteCommunitiesMap]
  );

  const toggleFavoriteUser = useCallback(
    async (userId) => {
      if (favoriteUsersMap[userId]) {
        await dispatch(removeFavoriteUser(userId));
      } else {
        await dispatch(addFavoriteUser(userId));
      }
      dispatch(getFavoriteUsers());
    },
    [dispatch, favoriteUsersMap]
  );

  /* ------------- helper to create a link row ------------- */
  const makeRow =
    ({ mode, isFavorite, favoriteMap, onToggle }) =>
    (item) =>
      (
        <NavLeftDropdownLink
          key={`${mode}-${item.id}`}
          mode={mode}
          item={item}
          favorite={isFavorite}
          favoriteType={favoriteMap}
          setShowDropdown={closeDropdown}
          setShowIcon={closeDropdown} /* same handler */
          handleFavorite={(e) => {
            e.preventDefault();
            onToggle(item.id);
          }}
        />
      );

  /* ------------- build `sections` array (memoised) ------------- */
  const sections = useMemo(() => {
    return [
      {
        title: "Favorites",
        items: [
          ...lists.favoriteCommunities.filter(matchesFilter("name")),
          ...lists.favoriteUsers.filter(matchesFilter("username")),
        ],
        render(item) {
          return "name" in item
            ? makeRow({
                mode: "Community",
                isFavorite: true,
                favoriteMap: favoriteCommunitiesMap,
                onToggle: toggleFavoriteCommunity,
              })(item)
            : makeRow({
                mode: "User",
                isFavorite: true,
                favoriteMap: favoriteUsersMap,
                onToggle: toggleFavoriteUser,
              })(item);
        },
      },
      {
        title: "Your Communities",
        items: lists.subscriptions.filter(matchesFilter("name")),
        render: makeRow({
          mode: "Community",
          isFavorite: false,
          favoriteMap: favoriteCommunitiesMap,
          onToggle: toggleFavoriteCommunity,
        }),
      },
      {
        title: "Following",
        items: lists.followers.filter(matchesFilter("username")),
        render: makeRow({
          mode: "User",
          isFavorite: false,
          favoriteMap: favoriteUsersMap,
          onToggle: toggleFavoriteUser,
        }),
      },
      {
        title: "Feeds",
        items: ["home", "all"].filter((txt) => txt.includes(filterText)),
        render: (txt) => (
          <NavLink
            key={txt}
            to={txt === "home" ? "/" : "/all"}
            className="nav-left-dropdown-navitem"
            onClick={closeDropdown}
          >
            {txt === "home" ? <HomeIcon /> : <AllPostsIcon />}
            <span className="nav-left-dropdown-item">
              {txt === "home" ? "Home" : "All"}
            </span>
          </NavLink>
        ),
      },
      {
        title: "Other",
        items: [
          "user settings",
          "messages",
          "notifications",
          "create post",
        ].filter((txt) => txt.includes(filterText)),
        render: (txt) => {
          const definition = {
            "user settings": {
              to: "/settings/profile",
              icon: (
                <img
                  src={currentUser?.profileImg}
                  className="nav-left-dropdown-item-img"
                  alt="User"
                />
              ),
              label: "User Settings",
            },
            messages: {
              to: "/message/messages",
              icon: (
                <img
                  src={currentUser?.profileImg}
                  className="nav-left-dropdown-item-img"
                  alt="Messages"
                />
              ),
              label: "Messages",
            },
            notifications: {
              to: "/notifications",
              icon: <TfiBell />,
              label: "Notifications",
            },
            "create post": {
              to: "/submit",
              icon: <CreatePostIcon />,
              label: "Create Post",
            },
          }[txt];

          const { to, icon, label } = definition;
          return (
            <NavLink
              key={txt}
              to={to}
              className="nav-left-dropdown-navitem"
              onClick={closeDropdown}
            >
              {icon}
              <span className="nav-left-dropdown-item">{label}</span>
            </NavLink>
          );
        },
      },
    ];
  }, [
    lists,
    matchesFilter,
    favoriteCommunitiesMap,
    favoriteUsersMap,
    toggleFavoriteCommunity,
    toggleFavoriteUser,
    currentUser,
    filterText,
    closeDropdown,
  ]);

  /* expose to the view */
  return { filter, setFilter, sections };
}
