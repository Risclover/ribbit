import React, { useEffect } from "react";
import { useButtonState } from "@/hooks/useButtonState";

// Define a constant for the localStorage key
const LOCAL_STORAGE_KEY = "selectedPostFormat";

export const PostFormatDropdownBtn = React.forwardRef(
  ({ item, setShowDropdown }, ref) => {
    const { active, setActive, highlight, setHighlight, setFormat } =
      useButtonState(item);

    // Effect to load the saved format from localStorage on mount
    useEffect(() => {
      const savedFormat = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedFormat && savedFormat === item.format) {
        setActive(true);
        setFormat(savedFormat);
      }
    }, [item.format, setActive, setFormat]);

    const handleClick = () => {
      setActive(true);
      setShowDropdown(false);
      setFormat(item.format);
      // Save the selected format to localStorage
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, item.format);
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    };

    const handleMouseOver = () => {
      if (!active) {
        setHighlight(true);
      }
    };

    const handleMouseLeave = () => {
      setHighlight(false);
    };

    const className = `${
      active
        ? "format-btn-active"
        : highlight
        ? "post-format-btn format-btn-black"
        : "post-format-btn format-btn-grey"
    }`;

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
          <div className={`format-icon-bg`}>
            <img
              alt={`${item.format.toLowerCase()} format icon`}
              src={
                item.icons.blue // Since active is true, no need for ternary
              }
            />
          </div>
        ) : (
          <img
            alt={`${item.format.toLowerCase()} format icon`}
            src={highlight ? item.icons.black : item.icons.grey}
          />
        )}
        {item.format}
      </button>
    );
  }
);
