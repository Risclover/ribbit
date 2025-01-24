import { useState, useCallback } from "react";

/**
 * A small hook that toggles `headerBorder` and `footerBorder`
 * based on scroll position of a ref'd container.
 */
export function useModalScrollBorders(containerRef) {
  const [headerBorder, setHeaderBorder] = useState(false);
  const [footerBorder, setFooterBorder] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const isAtTop = container.scrollTop === 0;
    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;

    setHeaderBorder(!isAtTop);
    setFooterBorder(!isAtBottom);
  }, [containerRef]);

  return {
    handleScroll,
    headerBorder,
    footerBorder,
  };
}
