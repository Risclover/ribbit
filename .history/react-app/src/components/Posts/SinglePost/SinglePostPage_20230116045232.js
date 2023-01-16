import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../../store/one_post";
import { createComment, getComments } from "../../../store/comments";
import CommentForm from "../../Comments/CommentForm";
import Comments from "../../Comments/Comments";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  const dispatch = useDispatch();

  const comments = useSelector((state) => Object.values(state.comments));

  console.log("COMMENTS:", comments);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  if (!comments) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        {/* <NavLink to={`/posts/${+postId}`}> */}
        <SinglePost id={+postId} isPage={isPage} />
        {/* </NavLink> */}
        <Comments postId={postId} />
        {comments.length > 0 &&
          comments.map((comment) => <div>{comment.content}</div>)}
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
