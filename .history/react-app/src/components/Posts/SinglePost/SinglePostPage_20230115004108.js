import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  return (
    <>
      <div
        className="single-post-page"
        onClick={() => history.push(`/posts/${postId}`)}
      >
        <div className="single-post-left-col">
          {/* <NavLink to={`/posts/${+postId}`}> */}
          <SinglePost id={+postId} isPage={isPage} />
          {/* </NavLink> */}
        </div>
        <div className="single-post-right-col"></div>
      </div>
      <div
        className="single-post-page-overlay"
        onClick={() => history.push("/posts")}
      ></div>
    </>
  );
}
