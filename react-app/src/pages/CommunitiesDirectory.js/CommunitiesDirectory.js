import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./CommunitiesDirectory.css";

import { getCommunities } from "../../store/communities";

export default function CommunitiesDirectory({ setPageTitle }) {
  const dispatch = useDispatch();

  const communities = useSelector((state) => Object.values(state.communities));

  const [aList, setAList] = useState();
  const [bList, setBList] = useState();
  const [cList, setCList] = useState();

  for (let i = 0; i < communities.length; i++) {
    if (communities[i].name.toLowerCase().startsWith("a")) {
      console.log(communities[i].name);
    }
  }

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <span className="nav-left-dropdown-item">Communities Directory</span>
      </div>
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
              <NavLink to={`/c/${community.id}`}>{community.name}</NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}
