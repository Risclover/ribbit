import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { OldSearchDropdown } from "./OldSearchDropdown";
import "./Searchbar.css";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "@/hooks";

export function OldSearchbar({
  searchQuery,
  setSearchQuery,
  adjustQuery,
  loggedIn,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const wrapperRef = useRef(null);
  const ref = useRef();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    if (adjustQuery) ref.current.focus();
  }, [adjustQuery]);

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(
  //       e,
  //       wrapperRef,
  //       showSearchDropdown,
  //       setShowSearchDropdown
  //     );
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(
  //         e,
  //         wrapperRef,
  //         showSearchDropdown,
  //         setShowSearchDropdown
  //       );
  //     });
  //   };
  // }, [wrapperRef, showSearchDropdown]);

  useOutsideClick(wrapperRef, () => setShowSearchDropdown(false));

  useEffect(() => {
    if (searchQuery?.length === 0) {
      setShowSearchDropdown(false);
    }
  }, [showSearchDropdown, searchQuery]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setShowSearchDropdown(false);
      history.push(`/search/query?q=${searchQuery}`);
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
        <OldSearchDropdown
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowSearchDropdown={setShowSearchDropdown}
        />
      )}
    </div>
  );
}
