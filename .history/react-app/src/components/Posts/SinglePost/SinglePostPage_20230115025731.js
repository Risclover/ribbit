import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  return (
    <div className="single-post-page-structure">
      <div
        className="single-post-page-overlay"
        onClick={() => history.push("/posts")}
      ></div>
      <div className="single-post-page-topbar">
        <div className="single-post-page-topbar-content">
          <div className="single-post-page-topbar-left"></div>
          <button
            className="single-page-topbar-close"
            onClick={() => history.push(`/posts`)}
          >
            <i className="fa-solid fa-x"></i> Close
          </button>
        </div>
      </div>
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
    </div>
  );
}
