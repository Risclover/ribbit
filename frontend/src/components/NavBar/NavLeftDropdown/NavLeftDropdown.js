import React from "react";
import { NavGroup } from "./NavGroup";
import { useNavLeftDropdown } from "@/hooks/useNavLeftDropdown";
import { useIsMobile, useIsSmallScreen } from "hooks";

export function NavLeftDropdown({
  setShowIcon,
  setShowDropdown,
  setShowNavSidebar,
}) {
  /* close handler shared by rows + filter clear */
  const close = () => {
    setShowIcon(false);
    setShowDropdown(false);
    if (isSmall || isMobile) setShowNavSidebar(false);
  };

  const isSmall = useIsSmallScreen(768);
  const isMobile = useIsMobile();

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
