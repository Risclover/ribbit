import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CommunitiesDirectory.css";

import { getCommunities } from "../../store/communities";

export default function CommunitiesDirectory() {
  const dispatch = useDispatch();

  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);
  return (
    <div className="communities-directory-container">
      <div className="directory-header">
        <h1>Browse communities</h1>
      </div>
      <div className="directory-listings-container">
        {communities.map((community, idx) => (
          <div className="directory-listing" key={idx}>
            <NavLink to={`/c/${community.id}`}>{community.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
