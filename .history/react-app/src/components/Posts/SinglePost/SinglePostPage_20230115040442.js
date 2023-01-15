import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        {/* <NavLink to={`/posts/${+postId}`}> */}
        <SinglePost id={+postId} isPage={isPage} />
        {/* </NavLink> */}
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
