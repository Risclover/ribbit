import { BackArrowIcon, SearchIcon } from "assets";
import React, { useState } from "react";
import { SearchTabs } from "./SearchTabs";
import { useScrollLock } from "hooks";
import { Searchbar } from "../Searchbar";

export function MobileSearchbar({ showSearchScreen, setShowSearchScreen }) {
  const [query, setQuery] = useState("");
  useScrollLock(showSearchScreen);
  return (
    <div className="mobile-searchbar-container">
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
