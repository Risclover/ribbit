import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getSubscriptions } from "../../store/subscriptions";
export default function SubscribedPosts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  });
  return <div>SubscribedPosts</div>;
}
