export function NavGroup({ title, items, children }) {
  if (!items?.length) return null;
  return (
    <>
      <div className="nav-left-dropdown-title">{title}</div>
      {children(items)}
    </>
  );
}
