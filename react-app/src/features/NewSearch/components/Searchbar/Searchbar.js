import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SearchDropdown } from "./SearchDropdown";
import { getSearchQuery } from "../../utils/getSearchQuery";
import "../../Search.css";

export function Searchbar({ loggedIn, searchbarRef }) {
  const formRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

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
  
  const handleEnter = (e) => {
    if (e.key === "Enter" && searchQuery.trim().length > 0) {
      setShowSearchDropdown(false);
      searchbarRef.current.blur();
      history.push(`/search/posts?q=${searchQuery.trim()}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    formRef.current.submit();
  };
  return (
    <div
      className={
        loggedIn ? "nav-search-bar" : "nav-search-bar nav-search-loggedout"
      }
    >
      <div
        className={`nav-search-stuff${
          showSearchDropdown && searchQuery.length > 0 ? " nav-search-open" : ""
        }`}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          action="/search/posts"
          method="get"
          role="search"
          className="nav-search-input-container"
        >
          <label htmlFor="nav-search-bar">
            <div aria-hidden="true" className="nav-search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="15"
                viewBox="0 0 15 15"
                width="15"
              >
                <path
                  d="m14.5 14.5-4-4m-4 2c-3.31371 0-6-2.68629-6-6s2.68629-6 6-6 6 2.68629 6 6-2.68629 6-6 6z"
                  stroke="#878a8c"
                />
              </svg>
            </div>
          </label>
          <input
            type="search"
            id="nav-search-bar"
            ref={searchbarRef}
            value={searchQuery}
            onKeyPress={handleEnter}
            onFocus={(e) => {
              if (e.target.value.length > 0) setShowSearchDropdown(true);
            }}
            onChange={(e) => {
              setShowSearchDropdown(true);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search Ribbit"
            className="nav-input"
            name="q"
          />
        </form>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              color="#1c1c1c"
              fill="none"
            >
              <path
                d="M15.7494 15L9.75 9M9.75064 15L15.75 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
                strokeLinejoin="square"
              />
              <path
                d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </div>
        )}
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
