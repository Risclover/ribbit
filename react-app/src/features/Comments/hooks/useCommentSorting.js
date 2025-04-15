import { useRef, useState } from "react";

/**
 * Logic for CommentSorting component
 */
export function useCommentSorting({ setSortType }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const SORT_OPTIONS = ["Best", "Top", "New", "Old"];

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const onOptionClick = (e, option) => {
    e.preventDefault();
    setSortType(option);
    setShowDropdown(false);
  };

  return {
    SORT_OPTIONS,
    onOptionClick,
    toggleDropdown,
    wrapperRef,
    showDropdown,
    setShowDropdown,
  };
}
