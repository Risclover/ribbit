import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavLeftDropdownLink from "./NavLeftDropdownLink";
import {
  addFavoriteCommunity,
  removeFavoriteCommunity,
  getFavoriteCommunities,
} from "@/store";

// Custom hook for filtering and sorting items
function useFilteredList(items) {
  const [filter, setFilter] = useState("");
  const filteredItems = useMemo(
    () =>
      items
        .filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [filter, items]
  );

  return { filter, setFilter, filteredItems };
}

// Component for each section
const Section = ({ title, items, renderItem }) => {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="nav-left-dropdown-title">{title}</div>
      {items.map(renderItem)}
    </div>
  );
};

export function NavLeftDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { favoriteCommunities, favoriteUsers, subscriptions, followers } =
    useSelector((state) => ({
      favoriteCommunities: Object.values(state.favoriteCommunities),
      favoriteUsers: Object.values(state.favoriteUsers),
      subscriptions: Object.values(state.subscriptions),
      followers: Object.values(state.followers?.follows),
    }));

  const {
    filter,
    setFilter,
    filteredItems: filteredFavoriteCommunities,
  } = useFilteredList(favoriteCommunities);

  const { filteredItems: filteredFavoriteUsers } =
    useFilteredList(favoriteUsers);

  const handleFavoriteCommunity = async (community) => {
    if (favoriteCommunities[community.id]) {
      await dispatch(removeFavoriteCommunity(community.id));
    } else {
      await dispatch(addFavoriteCommunity(community.id));
    }
    dispatch(getFavoriteCommunities());
  };

  const renderItem = (item, type) => (
    <NavLeftDropdownLink
      key={item.id}
      item={item}
      favoriteType={type === "community" ? favoriteCommunities : favoriteUsers}
      handleFavorite={
        type === "community" ? handleFavoriteCommunity : handleFavoriteUser
      }
    />
  );

  return (
    <div className="nav-left-dropdown-insides">
      <input
        className="nav-left-dropdown-filter"
        type="text"
        placeholder="Filter"
        value={filter}
        autoFocus
        onChange={(e) => setFilter(e.target.value)}
      />
      <Section
        title="Favorites"
        items={filteredFavoriteCommunities.concat(filteredFavoriteUsers)}
        renderItem={(item) =>
          renderItem(item, item.username ? "user" : "community")
        }
      />
      <Section
        title="Your Communities"
        items={subscriptions}
        renderItem={(item) => renderItem(item, "community")}
      />
      <Section
        title="Following"
        items={followers}
        renderItem={(item) => renderItem(item, "user")}
      />
      {/* Similar sections for Feeds and Other */}
    </div>
  );
}
