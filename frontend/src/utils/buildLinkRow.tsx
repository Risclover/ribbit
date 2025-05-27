import { NavLeftDropdownLink } from "@/components";

export function buildLinkRow({
  mode,
  isFavoriteRow,
  favoritesMap,
  ontoggleFavorite,
  closeDropdown,
}) {
  return (item) => (
    <NavLeftDropdownLink
      key={`${mode}-${item.id}`}
      mode={mode}
      item={item}
      favorite={isFavoriteRow}
      favoriteType={favoritesMap}
      setShowDropdown={closeDropdown}
      setShowIcon={closeDropdown}
      handleFavorite={(e) => {
        e.preventDefault();
        ontoggleFavorite(item.id);
      }}
    />
  );
}
