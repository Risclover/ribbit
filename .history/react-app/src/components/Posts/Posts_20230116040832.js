import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePost from "./SinglePost/SinglePost";
import "./Posts.css";
import RibbitBanner from "../../images/ribbit_banner.png";
import CreatePostBar from "../PostForms/CreatePostBar";
import Github from "../../images/github.png";
import LinkedIn from "../../images/linkedin.png";
import Portfolio from "../../images/codingcircle.png";
import Resume from "../../images/resume.png";
import Email from "../../images/mail.png";

export default function Posts() {
  const dispatch = useDispatch();
  const [showPost, setShowPost] = useState(false);
  const posts = useSelector((state) => Object.values(state.posts));
  const history = useHistory();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Sorting newer posts first
  posts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();
    return postB - postA;
  });

  //   if (!posts) return null;
  return (
    <div className="posts-container">
      <div className="posts-left-col">
        <CreatePostBar />
        {posts &&
          posts.map((post) => (
            <NavLink to={`/posts/${post.id}`}>
              <SinglePost id={post.id} />
            </NavLink>
          ))}
      </div>
      <div className="posts-right-col">
        <div className="posts-home-box">
          <img src={RibbitBanner} />
          <div className="posts-home-box-content">
            <h1>Home</h1>
            <p>
              Your personal Ribbit frontpage. Come here to check in with your
              favorite communities.
            </p>
            <div className="posts-home-box-buttons">
              <button
                className="posts-home-post-btn"
                onClick={() => history.push("/posts/submit")}
              >
                Create Post
              </button>
              <button className="posts-home-community-btn">
                Create Community
              </button>
            </div>
          </div>
        </div>
        <div className="posts-author-box">
          <h1>Author Links & Contact</h1>
          <ul>
            <li>
              <img src={Resume} />
            </li>
            <li>
              <img src={Github} />
            </li>
            <li>
              <img src={LinkedIn} />
            </li>
            <li>
              <img src={Email} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
