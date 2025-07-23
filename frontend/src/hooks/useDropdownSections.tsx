import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { TfiBell } from "react-icons/tfi";

import { HomeIcon, AllPostsIcon } from "@/assets";
import { CreatePostIcon } from "@/assets/icons/CreatePostIcon";
import { buildLinkRow } from "@/utils";
import { developerLinkIcons } from "@/assets";
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
      if (yourCommunities && yourCommunities) {
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

      base.push({
        title: "Developer Links",
        items: ["portfolio", "linkedin", "github", "email"].filter((text) =>
          text.includes(filterText)
        ),
        render: (text) => {
          const map = {
            portfolio: {
              to: "https://www.saradunlop.dev",
              icon: (
                <svg
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 511.999 511.999"
                  stroke="currentColor"
                  strokeWidth="6.6559870000000005"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M468.587,96H341.333V64c0-11.733-10.347-21.333-23.147-21.333H193.813c-12.8,0-23.147,9.6-23.147,21.333v32H43.413 C19.413,96,0,115.413,0,139.412v286.507c0,24,19.413,43.413,43.413,43.413h425.173c24,0,43.413-19.413,43.413-43.413V139.412 C512,115.413,492.587,96,468.587,96z M193.707,64h124.48c1.067,0,1.707,0.427,1.813,0.107V96H192l-0.213-31.36 C192.32,64.213,193.067,64,193.707,64z M468.587,448H43.413c-12.16,0-22.08-9.92-22.08-22.08v-195.52 c45.76,49.28,151.787,71.787,182.293,77.44c4.907,28.907,32.427,48.427,61.333,43.52c22.4-3.84,39.893-21.44,43.52-43.84 c29.76-7.04,136.32-35.093,182.187-86.72v205.12h0.001C490.667,438.08,480.747,448,468.587,448z M224,298.667 c0-17.707,14.293-32,32-32c17.707,0,32,14.293,32,32c0,17.707-14.293,32-32,32C238.293,330.667,224,316.372,224,298.667z M307.52,285.76c-7.04-28.48-35.84-45.867-64.32-38.827c-19.307,4.8-34.453,19.947-38.933,39.36 C144.64,275.2,21.333,240.107,21.333,181.333v-41.92c0-12.16,9.92-22.08,22.08-22.08h425.173c12.16,0,22.08,9.92,22.08,22.08 v31.254h0.001C490.667,229.547,367.467,271.359,307.52,285.76z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              ),
              label: "Portfolio",
            },
            linkedin: {
              to: "https://www.linkedin.com/in/sara-dunlop",
              icon: (
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="2 2 20 20"
                  height="1em"
                  width="1em"
                >
                  {" "}
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "}
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>{" "}
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M20.3292112,2 C21.2519624,2 22,2.74752185 22,3.67078882 L22,20.3292112 C22,21.2519624 21.2524781,22 20.3292112,22 L3.67078882,22 C2.74803764,22 2,21.2524781 2,20.3292112 L2,3.67078882 C2,2.74803764 2.74752185,2 3.67078882,2 L20.3292112,2 Z M15.51875,9.5 C14.0993287,9.5 13.128125,10.127356 12.6956992,10.8562567 L12.625,10.9858333 L12.625,9.625 L9.91666667,9.625 L9.91666667,19.2083333 L12.8333333,19.2083333 L12.8333333,14.56625 C12.8333333,13.0104167 13.40625,12.0208333 14.7833333,12.0208333 C15.7330797,12.0208333 16.1315784,12.8606664 16.1644352,14.3580086 L16.1666667,14.56625 L16.1666667,19.2083333 L19.0833333,19.2083333 L19.0833333,13.9154167 C19.0833333,11.0575 18.3995833,9.5 15.51875,9.5 Z M7.83333333,9.5 L4.91666667,9.5 L4.91666667,19.0833333 L7.83333333,19.0833333 L7.83333333,9.5 Z M6.375,4.5 C5.33958333,4.5 4.5,5.33958333 4.5,6.375 C4.5,7.41041667 5.33958333,8.25 6.375,8.25 C7.41041667,8.25 8.25,7.41041667 8.25,6.375 C8.25,5.33958333 7.41041667,4.5 6.375,4.5 Z"
                    ></path>{" "}
                  </g>{" "}
                </svg>
              ),
              label: "LinkedIn",
            },
            github: {
              to: "https://www.github.com/Risclover",
              icon: (
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>github [#142]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-140.000000, -7559.000000)"
                        fill="currentColor"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                            id="github-[#142]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              ),
              label: "GitHub",
            },
            email: {
              to: "mailto:sara.dunlop.dev@gmail.com",
              icon: (
                <svg
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 474 474"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M437.5,59.3h-401C16.4,59.3,0,75.7,0,95.8v282.4c0,20.1,16.4,36.5,36.5,36.5h401c20.1,0,36.5-16.4,36.5-36.5V95.8 C474,75.7,457.6,59.3,437.5,59.3z M432.2,86.3L239.5,251.1L46.8,86.3H432.2z M447,378.2c0,5.2-4.3,9.5-9.5,9.5h-401 c-5.2,0-9.5-4.3-9.5-9.5V104.9l203.7,174.2c0.1,0.1,0.3,0.2,0.4,0.3c0.1,0.1,0.3,0.2,0.4,0.3c0.3,0.2,0.5,0.4,0.8,0.5 c0.1,0.1,0.2,0.1,0.3,0.2c0.4,0.2,0.8,0.4,1.2,0.6c0.1,0,0.2,0.1,0.3,0.1c0.3,0.1,0.6,0.3,1,0.4c0.1,0,0.3,0.1,0.4,0.1 c0.3,0.1,0.6,0.2,0.9,0.2c0.1,0,0.3,0.1,0.4,0.1c0.3,0.1,0.7,0.1,1,0.2c0.1,0,0.2,0,0.3,0c0.4,0,0.9,0.1,1.3,0.1l0,0l0,0 c0.4,0,0.9,0,1.3-0.1c0.1,0,0.2,0,0.3,0c0.3,0,0.7-0.1,1-0.2c0.1,0,0.3-0.1,0.4-0.1c0.3-0.1,0.6-0.2,0.9-0.2c0.1,0,0.3-0.1,0.4-0.1 c0.3-0.1,0.6-0.2,1-0.4c0.1,0,0.2-0.1,0.3-0.1c0.4-0.2,0.8-0.4,1.2-0.6c0.1-0.1,0.2-0.1,0.3-0.2c0.3-0.2,0.5-0.3,0.8-0.5 c0.1-0.1,0.3-0.2,0.4-0.3c0.1-0.1,0.3-0.2,0.4-0.3L447,109.2V378.2z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              ),
              label: "Email",
            },
          }[text];

          return (
            <a
              key={text}
              href={map.to}
              className="nav-left-dropdown-navitem"
              onClick={closeDropdown}
              target="_blank"
              rel="noreferrer"
            >
              {map.icon}
              <span className="nav-left-dropdown-item">{map.label}</span>
            </a>
          );
        },
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
