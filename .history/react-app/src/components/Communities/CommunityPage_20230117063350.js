import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
// import { getCommunityPosts } from "../../store/communities";
import "./CommunityPage.css";
import { getPosts } from "../../store/posts";
import SinglePost from "../Posts/SinglePost/SinglePost";

export default function CommunityPage() {
  const dispatch = useDispatch();
  const [isPage, setIsPage] = useState(true);

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
      <div className="community-page-header"></div>
      <div className="community-page-main">
        <div className="community-page-left-col">
          {commPosts.map((post) => (
            <NavLink to={`/posts/${post.id}`}>
              <SinglePost id={post.id} isPage={isPage} />
            </NavLink>
          ))}
        </div>
        <div className="community-page-right-col"></div>
      </div>
    </div>
  );
}
