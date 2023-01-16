import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../../store/one_post";
import { createComment, getComments } from "../../../store/comments";
import CommentForm from "../../Comments/CommentForm";
import Comments from "../../Comments/Comments";
import moment from "moment";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const comments = useSelector((state) => Object.values(state.comments));

  console.log("COMMENTS:", comments);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  // comments.sort((a, b) => {
  //   let commentA = new Date(a.createdAt).getTime();
  //   let commentB = new Date(b.createdAt).getTime();
  //   return commentB - commentA;
  // });

  if (!comments) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        {/* <NavLink to={`/posts/${+postId}`}> */}
        <SinglePost id={+postId} isPage={isPage} />
        {/* </NavLink> */}
        <Comments postId={postId} />
        {comments.length > 0 &&
          comments.map((comment) => (
            <div className="single-comment">
              {comment.content} by {comment.commentAuthor.username} -{" "}
              {moment(new Date(comment.createdAt)).fromNow()}
              {comment.commentAuthor.id === user.id && (
                <div className="comment-author-btns">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
