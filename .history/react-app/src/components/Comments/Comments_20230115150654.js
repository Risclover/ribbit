import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments } from "../../store/comments";
import { getSinglePost } from "../../store/one_post";
export default function Comments() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getSinglePost(Number(postId)));
  }, [postId, dispatch]);

  return <div className="comments-container"></div>;
}
