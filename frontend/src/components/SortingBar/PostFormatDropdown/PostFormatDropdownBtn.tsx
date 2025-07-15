import { forwardRef, ReactNode, useCallback, useEffect, useMemo } from "react";
import { useButtonState } from "@/hooks/useButtonState";

const LOCAL_STORAGE_KEY = "selectedPostFormat";

export interface DropdownItem {
  format: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}

interface PostFormatDropdownBtnProps {
  item: DropdownItem;
  setShowDropdown: (open: boolean) => void;
}

export const PostFormatDropdownBtn = forwardRef<
  HTMLButtonElement,
  PostFormatDropdownBtnProps
>(({ item, setShowDropdown }, ref) => {
  const { active, setActive, highlight, setHighlight, setFormat } =
    useButtonState(item);

  /* load saved state once */
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved === item.format) {
      setActive(true);
      setFormat(saved);
    }
  }, [item.format, setActive, setFormat]);

  const handleClick = useCallback(() => {
    setActive(true);
    setShowDropdown(false);
    setFormat(item.format);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, item.format);
    } catch (err) {
      console.error("localStorage write failed:", err);
    }
  }, [item.format, setActive, setFormat, setShowDropdown]);

  const handleMouseOver = useCallback(
    () => !active && setHighlight(true),
    [active, setHighlight]
  );
  const handleMouseLeave = useCallback(
    () => setHighlight(false),
    [setHighlight]
  );

  const className = useMemo(() => {
    if (active) return "post-format-btn format-btn-active";
    if (highlight) return "post-format-btn format-btn-black";
    return "post-format-btn format-btn-grey";
  }, [active, highlight]);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${item.format} format`}
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      data-testid={`dropdown-btn-${item.format}`}
    >
      {active ? item.activeIcon : item.icon}
      {item.format}
    </button>
  );
});
