import React from "react";
import { NavGroup } from "./NavGroup";
import { useNavLeftDropdown } from "@/hooks/useNavLeftDropdown";

export function NavLeftDropdown({ setShowIcon, setShowDropdown }) {
  /* close handler shared by rows + filter clear */
  const close = () => {
    setShowIcon(false);
    setShowDropdown(false);
  };
  const { filter, setFilter, sections } = useNavLeftDropdown(close);

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

      {sections.map(({ title, items, render }) => (
        <NavGroup key={title} title={title} items={items}>
          {(arr) => arr.map(render)}
        </NavGroup>
      ))}
    </div>
  );
}
