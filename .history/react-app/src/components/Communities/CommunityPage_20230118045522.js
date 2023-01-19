import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
// import { getCommunityPosts } from "../../store/communities";
import "./CommunityPage.css";
import { getPosts } from "../../store/posts";
import SinglePost from "../Posts/SinglePost/SinglePost";
import CreatePostBar from "../Posts/PostForms/CreatePostBar";
import moment from "moment";
import Cake from "../../images/piece4.png";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const [isPage, setIsPage] = useState("community");

  const { communityId } = useParams();

  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  const posts = useSelector((state) => Object.values(state.posts));
  let commPosts = posts.filter((post) => post.communityId == communityId);

  commPosts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();

    return postB - postA;
  });

  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
    dispatch(getPosts());
  }, [communityId, dispatch]);

  if (!community[0]) return null;
  return (
    <div className="community-page-container">
      <div className="community-page-header">
        <div className="community-page-header-top"></div>
        <div className="community-page-header-btm">
          <div className="community-header-info">
            <div className="community-header-info-details">
              <div className="community-header-info-img">
                <i className="fa-solid fa-circle-user"></i>
              </div>
              <div className="community-header-info-details-left">
                <div className="community-header-info-display-name">
                  <h1>{community[0].displayName}</h1>
                </div>
                <div className="community-header-info-name">
                  <h2>c/{community[0].name}</h2>
                </div>
              </div>
              <div className="community-header-info-details-right">
                <div className="community-header-info-subscribe">
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="community-page-main">
        <div className="community-page-left-col">
          <CreatePostBar />
          {commPosts.map((post) => (
            <NavLink
              activeClassName="single-post-active"
              to={`/posts/${post.id}`}
            >
              <SinglePost id={post.id} isPage={isPage} />
            </NavLink>
          ))}
        </div>
        <div className="community-page-right-col">
          <div className="community-page-community-info">
            <div className="community-page-box-header">About Community</div>
            <div className="community-page-box-content">
              <div className="community-page-box-description">
                <p>{community[0].description}</p>
              </div>
              <div className="community-page-box-date">
                <img src={Cake} className="community-cake-icon" />
                Created{" "}
                {moment(new Date(community[0].createdAt)).format(
                  "MMM DD, YYYY"
                )}
              </div>
              <div className="community-page-box-btn">
                <NavLink to={`/posts/submit`}>
                  <button className="community-page-box-create-post">
                    Create Post
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
