import { useCallback } from "react";
import { NavGroup } from "./NavGroup";
import { useNavLeftDropdown } from "@/hooks/useNavLeftDropdown";
import { useIsMobile, useIsSmallScreen } from "@/hooks";

export function NavLeftDropdown({
  setShowIcon,
  setShowDropdown,
  setShowNavSidebar,
}) {
  const isSmall = useIsSmallScreen(768);
  const isMobile = useIsMobile();

  /** Close handler reused by every row & by the filter-clear logic */
  const close = useCallback(() => {
    setShowIcon(false);
    setShowDropdown(false);
    if (isSmall || isMobile) setShowNavSidebar(false);
  }, [isSmall, isMobile, setShowIcon, setShowDropdown, setShowNavSidebar]);

  const { filter, setFilter, sections } = useNavLeftDropdown(close);

  return (
    <div className="nav-left-dropdown-insides">
      <input
        className={`nav-left-dropdown-filter${isSmall ? " filter-margin" : ""}`}
        type="text"
        placeholder="Filter"
        value={filter}
        autoFocus
        onChange={(e) => setFilter(e.target.value)}
      />

      {sections.map((sec, idx) => (
        <NavGroup
          /* title can be null → use index fallback for React key     */
          key={sec.title ?? `section-${idx}`}
          title={sec.title ?? undefined}
          items={sec.items}
          render={(items) => items.map(sec.render)}
        />
      ))}
    </div>
  );
}
