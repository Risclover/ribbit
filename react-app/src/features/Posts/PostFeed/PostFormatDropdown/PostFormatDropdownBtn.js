import React from "react";
import { useButtonState } from "../../../../hooks/useButtonState";

export const PostFormatDropdownBtn = React.forwardRef(
  ({ item, setShowDropdown }, ref) => {
    const { active, setActive, highlight, setHighlight, setFormat } =
      useButtonState(item);

    const className = `post-format-btn ${
      active
        ? "format-btn-active"
        : highlight
        ? "format-btn-black"
        : "format-btn-grey"
    }`;

    return (
      <button
        ref={ref}
        className={className}
        onClick={() => {
          setActive(true);
          setShowDropdown(false);
          setFormat(item.format);
        }}
        onMouseOver={() => setHighlight(!active)}
        onMouseLeave={() => setHighlight(false)}
        data-testid={`dropdown-btn-${item.format}`}
      >
        <img
          alt={`${item.format.toLowerCase()} format icon`}
          src={
            active
              ? item.icons.blue
              : highlight
              ? item.icons.black
              : item.icons.grey
          }
        />
        {item.format}
      </button>
    );
  }
);
