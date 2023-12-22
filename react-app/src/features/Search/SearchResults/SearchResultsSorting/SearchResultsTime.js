import React, { useEffect, useRef, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { SearchResultsTimeBtn } from "./SearchResultsTimeBtn";
import { HandleClickOutside } from "../../../../utils/HandleClickOutside";

export function SearchResultsTime({ searchPage }) {
  const wrapperRef = useRef(null);

  const [timeOpen, setTimeOpen] = useState(false);
  const [time, setTime] = useState("All Time");

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, timeOpen, setTimeOpen);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, timeOpen, setTimeOpen);
      });
    };
  }, [wrapperRef, timeOpen]);

  return (
    <div ref={wrapperRef}>
      {searchPage === "Posts" && (
        <button
          className={
            !timeOpen ? "search-results-time" : "search-results-time time-open"
          }
          onClick={(e) => {
            e.preventDefault();
            setTimeOpen(!timeOpen);
          }}
        >
          Time {!timeOpen && <VscChevronDown />} {timeOpen && <VscChevronUp />}
        </button>
      )}
      {timeOpen && (
        <div className="search-results-time-dropdown">
          {[
            "All Time",
            "Past Year",
            "Past Month",
            "Past Week",
            "Past 24 Hours",
            "Past Hour",
          ].map((btn) => (
            <SearchResultsTimeBtn
              time={time}
              setTime={setTime}
              btn={btn}
              setTimeOpen={setTimeOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
