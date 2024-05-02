import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { useOutsideClick } from "../../../../hooks";
import { SearchDropdown } from "./SearchDropdown";
import { getSearchQuery } from "../../utils/getSearchQuery";

export function Searchbar({ loggedIn, searchbarRef }) {
  const history = useHistory();
  const location = useLocation();
  const wrapperRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const query = getSearchQuery();

  useEffect(() => {
    let trimmed = query?.trim();
    setSearchQuery(trimmed);
  }, [query]);

  useEffect(() => {
    if (!location.pathname.includes("/search")) {
      setSearchQuery("");
    }
  }, [location]);

  useOutsideClick(wrapperRef, () => setShowSearchDropdown(false));

  useEffect(() => {
    if (searchQuery?.length === 0) {
      setShowSearchDropdown(false);
    }
  }, [showSearchDropdown, searchQuery]);

  const handleEnter = (e) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      setShowSearchDropdown(false);
      history.push(`/search/posts?q=${searchQuery.trim()}`);
    }
  };

  return (
    <div
      className={
        loggedIn ? "nav-search-bar" : "nav-search-bar nav-search-loggedout"
      }
      ref={wrapperRef}
    >
      <div className="nav-search-stuff">
        <div
          className={
            showSearchDropdown
              ? "nav-search-input-container search-input-focus"
              : "nav-search-input-container"
          }
        >
          <button className="nav-search-btn">
            <BsSearch />
          </button>
          <input
            ref={searchbarRef}
            value={searchQuery}
            onKeyPress={handleEnter}
            onFocus={() => {
              setShowSearchDropdown(true);
            }}
            onChange={(e) => {
              setShowSearchDropdown(true);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search Ribbit"
            className="nav-input"
          />
          {searchQuery && searchQuery.length > 0 && (
            <div
              className="search-close-icon"
              onClick={(e) => {
                setSearchQuery("");
                setShowSearchDropdown(false);
                let element = document.querySelector(".nav-input");
                element.focus();
              }}
            >
              <SlClose />
            </div>
          )}
        </div>
      </div>
      {showSearchDropdown && searchQuery && searchQuery.length > 0 && (
        <SearchDropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowSearchDropdown={setShowSearchDropdown}
        />
      )}
    </div>
  );
}
