import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { TfiBell } from "react-icons/tfi";

import { HomeIcon, AllPostsIcon } from "@/assets";
import { CreatePostIcon } from "@/assets/icons/CreatePostIcon";
import { buildLinkRow } from "@/utils";

/**
 * @param lists  {subscriptions, followers, favoriteCommunities, favoriteUsers}
 */
export function useDropdownSections({
  lists,
  currentUser,
  isSmallScreen,
  filter,
  favoriteCommunitiesById,
  favoriteUsersById,
  toggleFavoriteCommunity,
  toggleFavoriteUser,
  closeDropdown,
  createCommunityButtonRow,
  resourcesRows,
  setShowNavSidebar,
}) {
  /* -------- helpers ------------------ */
  const filterText = filter.trim().toLowerCase();
  const matches = (key) => (obj) =>
    !filterText || obj[key].toLowerCase().includes(filterText);

  /* -------- memo build ---------------- */
  const sections = useMemo(() => {
    /* BASE sections (desktop + mobile) */
    const base = [
      {
        title: "Favorites",
        items: [
          ...lists.favoriteCommunities.filter(matches("name")),
          ...lists.favoriteUsers.filter(matches("username")),
        ],
        render: (item) =>
          "name" in item
            ? buildLinkRow({
                mode: "Community",
                isFavoriteRow: true,
                favoritesMap: favoriteCommunitiesById,
                ontoggleFavorite: toggleFavoriteCommunity,
                closeDropdown,
              })(item)
            : buildLinkRow({
                mode: "User",
                isFavoriteRow: true,
                favoritesMap: favoriteUsersById,
                ontoggleFavorite: toggleFavoriteUser,
                closeDropdown,
              })(item),
      },
      {
        title: "Your Communities",
        items: lists.subscriptions.filter(matches("name")),
        render: buildLinkRow({
          mode: "Community",
          isFavoriteRow: false,
          favoritesMap: favoriteCommunitiesById,
          ontoggleFavorite: toggleFavoriteCommunity,
          closeDropdown,
        }),
      },
      {
        title: "Following",
        items: lists.followers.filter(matches("username")),
        render: buildLinkRow({
          mode: "User",
          isFavoriteRow: false,
          favoritesMap: favoriteUsersById,
          ontoggleFavorite: toggleFavoriteUser,
          closeDropdown,
        }),
      },
      {
        title: "Feeds",
        items: ["home", "all"].filter((t) => t.includes(filterText)),
        render: (text) => (
          <NavLink
            key={text}
            to={text === "home" ? "/" : "/all"}
            className="nav-left-dropdown-navitem"
            onClick={closeDropdown}
          >
            {text === "home" ? <HomeIcon /> : <AllPostsIcon />}
            <span className="nav-left-dropdown-item">
              {text === "home" ? "Home" : "All"}
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
        ].filter((text) => text.includes(filterText)),
        render: (text) => {
          const map = {
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
          }[text];

          return (
            <NavLink
              key={text}
              to={map.to}
              className="nav-left-dropdown-navitem"
              onClick={closeDropdown}
            >
              {map.icon}
              <span className="nav-left-dropdown-item">{map.label}</span>
            </NavLink>
          );
        },
      },
    ];

    /* MOBILE-ONLY extras */
    if (isSmallScreen) {
      /* 1️⃣ top unnamed: Home / All / Chat */
      base.unshift({
        title: null,
        items: ["home", "all", "chat"].filter((text) =>
          text.includes(filterText)
        ),
        render: (text) => {
          const map = {
            home: { icon: <HomeIcon />, to: "/", label: "Home" },
            all: { icon: <AllPostsIcon />, to: "/all", label: "All" },
            chat: { icon: <TfiBell />, to: "/chat", label: "Chat" },
          }[text];
          return (
            <NavLink
              key={text}
              to={map.to}
              className="nav-left-dropdown-navitem"
              onClick={closeDropdown}
            >
              {map.icon}
              <span className="nav-left-dropdown-item">{map.label}</span>
            </NavLink>
          );
        },
      });

      /* 2️⃣  “+ Create Community” */
      const yourCommunities = base.find((s) => s.title === "Your Communities");
      if (yourCommunities) {
        yourCommunities.items.unshift({ __create__: true });
        const origRender = yourCommunities.render;
        yourCommunities.render = (it) =>
          it.__create__ ? createCommunityButtonRow : origRender(it);
      }

      /* 3️⃣  Resources */
      base.push({
        title: "Resources",
        items: resourcesRows,
        render: (row) => row,
      });
    }

    return base;
  }, [
    lists,
    filterText,
    currentUser,
    isSmallScreen,
    favoriteCommunitiesById,
    favoriteUsersById,
    toggleFavoriteCommunity,
    toggleFavoriteUser,
    closeDropdown,
    createCommunityButtonRow,
    resourcesRows,
  ]);

  return sections;
}
