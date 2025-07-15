import { memo, type ReactNode } from "react";

interface NavGroupProps<T = unknown> {
  /** Optional heading shown above the group */
  title?: string | null;
  /** Items to pass to the render function */
  items: T[];
  /** Render-prop for the actual rows */
  render: (items: T[]) => ReactNode;
  /** Extra class(es) for outer wrapper (optional) */
  className?: string;
}

function NavGroupInner<T = unknown>({
  title,
  items,
  render,
  className = "",
}: NavGroupProps<T>) {
  if (!items?.length) return null;

  return (
    <div className={className}>
      {title && <div className="nav-left-dropdown-title">{title}</div>}
      {render(items)}
    </div>
  );
}

/** Memoised to skip re-render unless props change */
export const NavGroup = memo(NavGroupInner) as typeof NavGroupInner;
