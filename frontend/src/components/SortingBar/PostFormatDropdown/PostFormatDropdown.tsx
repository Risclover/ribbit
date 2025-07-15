import { useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { PostFormatDropdownBtn, DropdownItem } from "./PostFormatDropdownBtn";
import "./PostFormatDropdown.css";

interface PostFormatDropdownProps {
  formats: DropdownItem[];
  setShowDropdown: (open: boolean) => void;
}

export function PostFormatDropdown({
  formats,
  setShowDropdown,
}: PostFormatDropdownProps) {
  /* one ref for each button */
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /* focus first item on mount */
  useEffect(() => {
    buttonRefs.current[0]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;
      const focusedIndex = buttonRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );

      if (key === "ArrowDown") {
        e.preventDefault();
        buttonRefs.current[(focusedIndex + 1) % formats.length]?.focus();
      } else if (key === "ArrowUp") {
        e.preventDefault();
        buttonRefs.current[
          (focusedIndex - 1 + formats.length) % formats.length
        ]?.focus();
      } else if (key === "Escape") {
        setShowDropdown(false);
      }
    },
    [formats.length, setShowDropdown]
  );

  return (
    <div
      className="post-format-dropdown"
      data-testid="post-format-dropdown"
      aria-labelledby="PostFormatDropdownToggle"
      onKeyDown={handleKeyDown}
      role="menu"
    >
      <ul>
        {formats.map((item, index) => (
          <li key={item.format}>
            <PostFormatDropdownBtn
              ref={(el) => (buttonRefs.current[index] = el)}
              item={item}
              setShowDropdown={setShowDropdown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
