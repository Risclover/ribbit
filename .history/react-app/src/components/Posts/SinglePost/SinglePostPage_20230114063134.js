import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <NavLink to={`/posts/${+postId}`}>
          <SinglePost id={+postId} isPage={isPage} />
        </NavLink>
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
