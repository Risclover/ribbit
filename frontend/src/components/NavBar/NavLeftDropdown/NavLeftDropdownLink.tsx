import { MouseEvent, KeyboardEvent, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CommunityImg } from "@/components/CommunityImg";

/* ---------- types ---------- */

interface UserItem {
  id: number;
  profileImg: string;
  username: string;
}

interface CommunityItem {
  id: number;
  name: string;
  communitySettings?: Record<
    number,
    { communityIcon?: string; baseColor?: string }
  >;
}

type Item = UserItem | CommunityItem;

interface Props {
  item: Item | null;
  favoriteType: Record<number, boolean>;
  handleFavorite: (e: MouseEvent | KeyboardEvent, item: Item) => void;
  setShowDropdown: (open: boolean) => void;
  setShowIcon: (open: boolean) => void;
}

/* ---------- component ---------- */

export function NavLeftDropdownLink({
  item,
  favoriteType,
  handleFavorite,
  setShowDropdown,
  setShowIcon,
}: Props): JSX.Element | null {
  const isUser = "username" in item;
  const isFavorite = Boolean(favoriteType[item.id]);

  const linkPath = isUser
    ? `/users/${item.id}/profile`
    : `/c/${(item as CommunityItem).name}`;

  const displayName = isUser
    ? `u/${(item as UserItem).username}`
    : `c/${(item as CommunityItem).name}`;

  const altText = isUser ? "User avatar" : "Community icon";

  /* ---------- handlers ---------- */

  const closeDropdown = () => {
    setShowDropdown(false);
    setShowIcon(false);
  };

  const toggleFavorite = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFavorite(e, item);
    },
    [handleFavorite, item]
  );

  /* ---------- render ---------- */
  if (!item) return null;

  return (
    <NavLink
      to={linkPath}
      className="nav-left-dropdown-navitem"
      onClick={closeDropdown}
    >
      {isUser ? (
        <img
          src={(item as UserItem).profileImg}
          className="nav-left-dropdown-item-img"
          alt={altText}
        />
      ) : (
        <CommunityImg
          imgStyle={{
            backgroundColor: (item as CommunityItem).communitySettings?.[
              item.id
            ]?.baseColor,
          }}
          imgSrc={
            (item as CommunityItem).communitySettings?.[item.id]?.communityIcon
          }
          imgClass="nav-left-dropdown-item-img"
          imgAlt={altText}
        />
      )}

      <span className="nav-left-dropdown-item">{displayName}</span>

      <div
        className={`nav-left-dropdown-star${isFavorite ? " star-filled" : ""}`}
        role="button"
        aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
        aria-pressed={isFavorite}
        tabIndex={0}
        onClick={toggleFavorite}
        onKeyDown={(e) => e.key === "Enter" && toggleFavorite(e)}
      >
        {isFavorite ? <BsStarFill /> : <BsStar />}
      </div>
    </NavLink>
  );
}
