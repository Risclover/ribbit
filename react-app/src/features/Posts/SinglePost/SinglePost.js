import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";

import ClassicPostFormat from "../PostFeedFormats/ClassicPostFormat";
import CompactPostFormat from "../PostFeedFormats/CompactPostFormat";
import LoginForm from "../../auth/AuthModal/LoginForm";
import SignUpForm from "../../auth/AuthModal/SignUpForm";
import SinglePostKarmabar from "./SinglePostKarmabar";
import SinglePostAuthorBar from "./SinglePostAuthorBar";
import SinglePostContent from "./SinglePostContent";
import SinglePostButtonBar from "./SinglePostButtonBar";
import "./SinglePost.css";

function SinglePost({ id, isPage, userId, format }) {
  const post = useSelector((state) => state.posts[id]);
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <>
      {format === "Card" && (
        <div className="post-card-format">
          {post && (
            <div className="single-post-container">
              <SinglePostKarmabar
                post={post}
                upvote={upvote}
                downvote={downvote}
                setUpvote={setUpvote}
                setDownvote={setDownvote}
                setShowLoginForm={setShowLoginForm}
              />

              <div className="single-post-main">
                <SinglePostAuthorBar
                  post={post}
                  community={community}
                  isPage={isPage}
                />

                <SinglePostContent post={post} isPage={isPage} />

                <SinglePostButtonBar
                  post={post}
                  community={community}
                  isPage={isPage}
                  user={user}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {format === "Classic" && (
        <ClassicPostFormat
          id={id}
          isPage={isPage}
          userId={userId}
          post={post}
        />
      )}
      {format === "Compact" && (
        <CompactPostFormat
          id={id}
          isPage={isPage}
          userId={userId}
          post={post}
        />
      )}
      {showLoginForm && (
        <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
          <LoginForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
      {showSignupForm && (
        <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
          <SignUpForm
            setShowLoginForm={setShowLoginForm}
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
          />
        </Modal>
      )}
    </>
  );
}
export default memo(SinglePost);
