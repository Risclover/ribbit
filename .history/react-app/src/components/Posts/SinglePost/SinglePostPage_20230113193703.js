import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";

export default function SinglePostPage() {
  return (
    <div className="single-post-page">
      <SinglePost />
    </div>
  );
}
