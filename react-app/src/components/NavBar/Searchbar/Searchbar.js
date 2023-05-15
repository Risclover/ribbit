import React, { useState, useRef, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import { BsSearch } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { useHistory } from "react-router-dom";
import "./Searchbar.css";
import HandleClickOutside from "../../HandleClickOutside";

export default function Searchbar({
  searchQuery,
  setSearchQuery,
  adjustQuery,
  loggedIn,
}) {
  const history = useHistory();
  const wrapperRef = useRef(null);
  const ref = useRef();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // useEffect(() => {
  //   setPageTitle(
  //     <div className="nav-left-dropdown-face-title">
  //       <span className="nav-left-dropdown-item-svg">
  //         <BsSearch />
  //       </span>

  //       <span className="nav-left-dropdown-item">Search Results</span>
  //     </div>
  //   );
  // }, []);

  useEffect(() => {
    if (adjustQuery) ref.current.focus();
  }, [adjustQuery]);

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(
        e,
        wrapperRef,
        showSearchDropdown,
        setShowSearchDropdown
      );
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(
          e,
          wrapperRef,
          showSearchDropdown,
          setShowSearchDropdown
        );
      });
    };
  }, [wrapperRef, showSearchDropdown]);

  useEffect(() => {
    if (searchQuery?.length === 0) {
      setShowSearchDropdown(false);
    }
  }, [showSearchDropdown, searchQuery]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setShowSearchDropdown(false);
      history.push("/search/results");
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
            ref={ref}
            autoFocus={adjustQuery}
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
        </div>
      </div>
      {showSearchDropdown && searchQuery.length > 0 && (
        <SearchDropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowSearchDropdown={setShowSearchDropdown}
        />
      )}
    </div>
  );
}
