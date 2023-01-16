import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getComments } from "../../store/comments";

export default function Comments() {
  useEffect(() => {
    dispatch(getSinglePost(Number(postId)));
  }, [postId, dispatch]);
  return <div className="comments-container"></div>;
}
