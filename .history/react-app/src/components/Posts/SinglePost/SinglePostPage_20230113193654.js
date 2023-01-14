import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
export default function SinglePostPage() {
  return (
    <div className="single-post-page">
      <SinglePost />
    </div>
  );
}
