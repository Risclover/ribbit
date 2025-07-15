import {
  useContext,
  useState,
  useRef,
  useCallback,
  KeyboardEvent,
  memo,
} from "react";
import { TbChevronDown } from "react-icons/tb";
import {
  CardFormatIcon,
  CardFormatIconActive,
  ClassicFormatIcon,
  ClassicFormatIconActive,
  CompactFormatIcon,
  CompactFormatIconActive,
} from "@/assets";
import { PostFormatDropdown } from "./PostFormatDropdown";
import { PostFormatContext } from "@/context";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import "./PostFormatDropdown.css";

/* ---------- constants / helpers ---------- */

export type PostFormat = "Card" | "Classic" | "Compact";

const FORMATS = {
  Card: {
    format: "Card" as const,
    icon: <CardFormatIcon />,
    activeIcon: <CardFormatIconActive />,
  },
  Classic: {
    format: "Classic" as const,
    icon: <ClassicFormatIcon />,
    activeIcon: <ClassicFormatIconActive />,
  },
  Compact: {
    format: "Compact" as const,
    icon: <CompactFormatIcon />,
    activeIcon: <CompactFormatIconActive />,
  },
};

const FORMAT_LIST = Object.values(FORMATS);

const isPostFormat = (v: string): v is PostFormat =>
  v === "Card" || v === "Classic" || v === "Compact";

/* ---------- component ---------- */

export const PostFormatDropdownFace = memo(function PostFormatDropdownFace() {
  const { format } = useContext(PostFormatContext); // may be any string
  const safeFormat: PostFormat = isPostFormat(format) ? format : "Card";

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useOutsideClick(wrapperRef, () => setOpen(false));

  const toggle = () => setOpen((o) => !o);

  const handleKey = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  return (
    <div className="post-format-face-wrapper" ref={wrapperRef}>
      <button
        ref={buttonRef}
        className="post-format-face"
        aria-expanded={open}
        aria-haspopup="true"
        id="PostFormatDropdownToggle"
        data-testid="post-format-face-button"
        onClick={toggle}
        onKeyDown={handleKey}
      >
        {FORMATS[safeFormat].icon}
        <TbChevronDown />
      </button>

      {open && (
        <PostFormatDropdown formats={FORMAT_LIST} setShowDropdown={setOpen} />
      )}
    </div>
  );
});
