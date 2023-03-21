import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchResultsComments({
  comments,
  posts,
  searchQuery,
  SearchDude,
  setAdjustQuery,
}) {
  const [finishedComments, setFinishedComments] = useState([]);
  const [author, setAuthor] = useState("");

  let unfinishedComments = [];

  useEffect(() => {
    let commentObj = {};

    for (let post of posts) {
      let username = post.author;
      for (let i = 0; i < Object.values(post.postComments).length; i++) {
        commentObj = {
          communityImg: post.communityImg,
          userId: post.userId,
          username: username,
          authorId: Object.values(post.postComments)[i].commentAuthor.id,
          userImg: Object.values(post.postComments)[i].commentAuthor
            .profile_img,
          content: Object.values(post.postComments)[i].content,
          postTitle: post.title,
          community: post.communityName,
          votes:
            Object.values(post.postComments)[i].upvotes -
            Object.values(post.postComments)[i].downvotes,
          postVotes: post.votes,
          author: Object.values(post.postComments)[i].commentAuthor.username,
          postId: post.id,
          postDate: post.createdAt,
          postEdit: post.updatedAt,
          createdAt: Object.values(post.postComments)[i].createdAt,
          updatedAt: Object.values(post.postComments)[i].updatedAt,
          commentCount: Object.values(post.postComments).length,
          commentId: Object.values(post.postComments)[i].id,
          communityId: post.communityId,
        };
        unfinishedComments.push(commentObj);
      }
    }

    setFinishedComments(unfinishedComments);
  }, []);

  return (
    <div className="search-results-page-comments">
      {finishedComments
        .filter((comment) =>
          comment["content"].toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((comment) =>
          comment["content"]
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ? (
            <NavLink to={`/posts/${comment.postId}`}>
              <div className="search-results-page-comment">
                <div className="search-results-comment-post-header">
                  <NavLink to={`/c/${comment.communityId}`}>
                    <img
                      src={comment.communityImg}
                      className="search-results-comment-community-img"
                    />
                  </NavLink>
                  <NavLink to={`/c/${comment.communityId}`}>
                    <span className="search-results-comment-community">
                      c/{comment.community}
                    </span>
                  </NavLink>
                  <span className="search-results-comment-dot">•</span>{" "}
                  <span className="search-results-comment-post-author-box">
                    Posted by{" "}
                    <NavLink to={`/users/${comment.userId}/profile`}>
                      <span className="search-results-comment-post-author">
                        u/{comment.username}
                      </span>
                    </NavLink>
                    {moment(comment.postDate).fromNow()}
                  </span>
                </div>
                <div className="search-results-comment-post-title">
                  {comment.postTitle}
                </div>
                <div className="search-results-comment-body">
                  <div className="search-results-comment-author-img-box">
                    <NavLink to={`/users/${comment.authorId}/profile`}>
                      <img
                        src={comment.userImg}
                        className="search-results-comment-author-img"
                      />
                    </NavLink>
                  </div>
                  <div className="search-results-comment-body-right">
                    <div className="search-results-comment-author-box">
                      <NavLink to={`/users/${comment.authorId}/profile`}>
                        <span className="search-results-comment-author">
                          {comment.author}
                        </span>
                      </NavLink>
                      <span className="search-results-comment-author-dot">
                        ·
                      </span>{" "}
                      <span className="search-results-comment-author-date">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="search-results-comment">
                      {comment.content}
                    </div>
                    <div className="search-results-comment-upvotes">
                      {comment.votes} upvotes
                    </div>
                  </div>
                </div>
                <div className="search-results-comment-post-link">
                  Go to thread
                </div>
                <div className="search-results-comment-post-footer">
                  <span className="search-results-comment-post-votes">
                    {comment.postVotes}{" "}
                    {comment.postVotes === 1 ? "upvote" : "upvotes"}
                  </span>{" "}
                  {comment.commentCount}{" "}
                  {comment.commentCount === 1 ? "comment" : "comments"}
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )
        )}
      {finishedComments.filter((user) =>
        user["content"].toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <div className="no-search-results">
          <img src={SearchDude} />
          <h2>Hm... we couldn't find any results for “{searchQuery}”</h2>
          <p>
            Double-check your spelling or try different keywords to{" "}
            <span onClick={() => setAdjustQuery(true)}>adjust your search</span>
          </p>
        </div>
      )}
    </div>
  );
}
