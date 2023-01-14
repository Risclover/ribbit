import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";

export default function SinglePost() {
  return <div className="single-post-container"></div>;
}
