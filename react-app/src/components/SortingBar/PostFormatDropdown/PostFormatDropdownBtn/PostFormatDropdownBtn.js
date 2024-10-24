import React from "react";
import { useButtonState } from "@/hooks/useButtonState";

export const PostFormatDropdownBtn = React.forwardRef(
  ({ item, setShowDropdown }, ref) => {
    const { active, setActive, highlight, setHighlight, setFormat } =
      useButtonState(item);

    const className = `${
      active
        ? "format-btn-active"
        : highlight
        ? "post-format-btn format-btn-black"
        : "post-format-btn format-btn-grey"
    }`;

    return (
      <button
        aria-label={item.format + " format"}
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
        {active ? (
          <div className={`format-icon-bg`}>
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
          </div>
        ) : (
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
        )}
        {item.format}
      </button>
    );
  }
);
