import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
import { getCommunityPosts } from "../../store/communities";
import "./CommunityPage.css";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  console.log("community~", community);

  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
    dispatch(getCommunityPosts(+communityId));
  }, [communityId, dispatch]);

  if (!community[0]) return null;
  return (
    <div className="community-page-container">Hello {community[0].name}</div>
  );
}
