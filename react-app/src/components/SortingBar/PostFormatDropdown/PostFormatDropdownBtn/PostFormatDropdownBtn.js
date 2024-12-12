import React, { useEffect, useCallback, useMemo } from "react";
import { useButtonState } from "@/hooks/useButtonState";

// Define a constant for the localStorage key
const LOCAL_STORAGE_KEY = "selectedPostFormat";

export const PostFormatDropdownBtn = React.forwardRef(
  ({ item, setShowDropdown }, ref) => {
    const { active, setActive, highlight, setHighlight, setFormat } =
      useButtonState(item);

    // Load the saved format from localStorage on mount
    useEffect(() => {
      const savedFormat = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedFormat === item.format) {
        setActive(true);
        setFormat(savedFormat);
      }
    }, [item.format, setActive, setFormat]);

    const handleClick = useCallback(() => {
      setActive(true);
      setShowDropdown(false);
      setFormat(item.format);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, item.format);
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }, [item.format, setActive, setFormat, setShowDropdown]);

    const handleMouseOver = useCallback(() => {
      if (!active) {
        setHighlight(true);
      }
    }, [active, setHighlight]);

    const handleMouseLeave = useCallback(() => {
      setHighlight(false);
    }, [setHighlight]);

    const className = useMemo(() => {
      if (active) return "format-btn-active";
      if (highlight) return "post-format-btn format-btn-black";
      return "post-format-btn format-btn-grey";
    }, [active, highlight]);

    const iconSrc = useMemo(() => {
      if (active) return item.icons.dark;
      return highlight ? item.icons.dark : item.icons.grey;
    }, [active, highlight, item.icons]);

    return (
      <button
        aria-label={`${item.format} format`}
        ref={ref}
        className={className}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        data-testid={`dropdown-btn-${item.format}`}
      >
        {active ? (
          <div className="format-icon-bg">
            <img
              alt={`${item.format.toLowerCase()} format icon`}
              src={iconSrc}
            />
          </div>
        ) : (
          <img alt={`${item.format.toLowerCase()} format icon`} src={iconSrc} />
        )}
        {item.format}
      </button>
    );
  }
);
