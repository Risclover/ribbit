import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/communities";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const community = useSelector((state) => state.communities[communityId]);

  console.log("community~", community);
  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
  }, [communityId, dispatch]);
  return <div className="community-page-container"></div>;
}
