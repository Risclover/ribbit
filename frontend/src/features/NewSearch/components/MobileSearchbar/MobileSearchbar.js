import { BackArrowIcon, SearchIcon } from "assets";
import React, { useRef, useState } from "react";
import { SearchTabs } from "./SearchTabs";
import { useFocusTrap, useScrollLock } from "hooks";
import { Searchbar } from "../Searchbar";

export function MobileSearchbar({ showSearchScreen, setShowSearchScreen }) {
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  useScrollLock(showSearchScreen);
  useFocusTrap(showSearchScreen, wrapperRef);
  return (
    <div className="mobile-searchbar-container" ref={wrapperRef}>
      <div className="mobile-searchbar-top">
        <button
          className="mobile-searchbar-back-btn"
          onClick={() => setShowSearchScreen(false)}
        >
          <BackArrowIcon />
        </button>
        <Searchbar setShowSearchScreen={setShowSearchScreen} />
      </div>
    </div>
  );
}
