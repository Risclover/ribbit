import { FC, useContext, MouseEvent, useMemo } from "react";
import { PostFormatDropdownFace } from "./PostFormatDropdown";
import { PostFormatContext } from "@/context";
import "./SortingBar.css";

/* ──────────── shared icon components ──────────── */

const NewIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <i className={`fa-solid fa-certificate ${className}`} />
);

const TopIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <i className={`fa-solid fa-ranking-star ${className}`} />
);

/* ──────────── types ──────────── */

export type SortKey = "new" | "top";

interface SortButtonProps {
  active: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  community?: unknown;
  Icon: FC<{ className?: string }>;
  label: string;
}

export interface SortingBarProps {
  community?: unknown;
  sortMode: SortKey;
  setSortMode: (m: SortKey) => void;
  isPage?: string; // "profile" | "feed" | …
}

/* ──────────── helpers ──────────── */

const SortButton: FC<SortButtonProps> = ({
  active,
  onClick,
  community,
  Icon,
  label,
}) => {
  const className = [
    "post-sorting-bar-btn",
    active && "active-sort-btn",
    community && "community-sorting-bar-btn",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      <Icon className="sort-icon" />
      {label}
    </button>
  );
};

/* ──────────── main component ──────────── */

export const SortingBar: FC<SortingBarProps> = ({
  community,
  sortMode,
  setSortMode,
  isPage,
}) => {
  const { format } = useContext(PostFormatContext);

  // stable reference so the array itself doesn’t change each render
  const SORTS = useMemo(
    () => [
      { key: "new" as const, label: "New", Icon: NewIcon },
      { key: "top" as const, label: "Top", Icon: TopIcon },
    ],
    []
  );

  return (
    <div className="post-sorting-bar">
      <div className="post-sorting-bar-left">
        {SORTS.map(({ key, label, Icon }) => (
          <SortButton
            key={key}
            active={sortMode === key}
            label={label}
            Icon={Icon}
            community={community}
            onClick={() => setSortMode(key)}
          />
        ))}
      </div>

      {format !== "none" && isPage !== "profile" && <PostFormatDropdownFace />}
    </div>
  );
};
