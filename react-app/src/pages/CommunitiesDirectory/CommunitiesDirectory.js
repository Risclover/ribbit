import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { PageTitleContext } from "../../context";
import { getCommunities } from "../../store";
import "./CommunitiesDirectory.css";

export function CommunitiesDirectory() {
  const { setPageTitle } = useContext(PageTitleContext);
  const dispatch = useDispatch();

  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    setPageTitle(
      <span className="nav-left-dropdown-item">Communities Directory</span>
    );
  }, []);

  return (
    <div className="communities-directory-container">
      <div className="directory-header">
        <h1>Browse communities</h1>
      </div>
      <div className="directory-listings-container">
        {communities
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((community, idx) => (
            <div className="directory-listing" key={idx}>
              <NavLink to={`/c/${community.name}`}>{community.name}</NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}
