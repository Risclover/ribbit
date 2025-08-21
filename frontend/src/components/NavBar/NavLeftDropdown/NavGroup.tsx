import { memo } from "react";

function NavGroupInner({ title, items, render, className = "" }) {
  if (!items?.length) return null;

  return (
    <div className={className}>
      {title && <div className="nav-left-dropdown-title">{title}</div>}
      {render(items)}
    </div>
  );
}

/** Memoised to skip re-render unless props change */
export const NavGroup = memo(NavGroupInner);
