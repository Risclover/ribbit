import React from "react";
import SearchDude from "../../../../assets/images/search-icon.png";

export const NoResults = ({ query }) => {
  return (
    <div className="no-search-results">
      <img src={SearchDude} alt="Search Dude" />
      <h2>Hm... we couldn't find any results for “{query}”</h2>
      <p>
        Double-check your spelling or try different keywords to{" "}
        <span>adjust your search</span>
      </p>
    </div>
  );
};
