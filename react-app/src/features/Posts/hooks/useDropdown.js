// useDropdown.js
import { useState, useEffect, useRef } from "react";

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, toggle, wrapperRef };
}
