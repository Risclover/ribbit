import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/communities";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const { communityId } = useParams();

  useEffect(() => {
    dispatch(getSingleCommunity());
  });
  return <div className="community-page-container"></div>;
}
