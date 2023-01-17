import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePost from "./SinglePost/SinglePost";
import "./Posts.css";
import RibbitBanner from "../../images/ribbit_banner.png";
import CreatePostBar from "../PostForms/CreatePostBar";
import Github from "../../images/github.png";
import LinkedIn from "../../images/linkedin.png";
import Resume from "../../images/resume.png";
import Email from "../../images/mail.png";
import { getSingleCommunity } from "../../store/one_community";
import { getCommunities } from "../../store/communities";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  // Sorting newer posts first
  posts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();
    return postB - postA;
  });

  return (
    <div className="posts-container">
      <div className="posts-left-col">
        <CreatePostBar />
        {posts &&
          posts.map((post) => (
            <NavLink key={post.id} to={`/posts/${post.id}`}>
              <SinglePost key={post.id} id={post.id} />
            </NavLink>
          ))}
      </div>
      <div className="posts-right-col">
        <div className="posts-home-box">
          <img src={RibbitBanner} alt="Ribbit banner" />
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
          <h1>Developer Links</h1>
          <ul>
            <li key={0} className="tooltip">
              <span className="tooltiptext">Developer Portfolio</span>
              <a
                href="https://www.saradunlop.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Resume} alt="Portfolio" />
              </a>
            </li>
            <li key={1} className="tooltip">
              <img src={LinkedIn} alt="LinkedIn" />
              <span className="tooltiptext">LinkedIn</span>
            </li>
            <li key={2} className="tooltip">
              <a
                href="https://www.github.com/Risclover"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Github} alt="GitHub" />
              </a>
              <span className="tooltiptext">GitHub</span>
            </li>
            <li key={3} className="tooltip">
              <a
                href="mailto:sara091592@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Email} alt="Email" />
              </a>
              <span className="tooltiptext">Email</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
