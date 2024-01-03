import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { addToSubscriptions, deleteSubscription } from "../../../store";
import { CommunityOptions } from "../CommunityInfoBox";
import Cake from "../../../assets/images/misc/piece4.png";

export function CommunityDetails({ post, community }) {
  const subscriptions = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.session.user);

  const [subscribed, setSubscribed] = useState(
    subscriptions[post?.communityId]
  );
  const [members, setMembers] = useState(
    post?.communityMembers || community?.members || 0
  );

  const [subscribeBtnText, setSubscribeBtnText] = useState("Leave");
  const handleCreatePostClick = (e) => {};

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await dispatch(addToSubscriptions(post?.communityId));
    !user ? history.push("/login") : setSubscribed(true);
    dispatch(getSubscriptions());
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    await dispatch(deleteSubscription(post?.communityId));
    setSubscribed(false);
  };

  const handleLoggedOutClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <NavLink to={`/c/${post !== null ? post?.communityName : community?.name}`}>
      <div className="single-post-community-box">
        <div className="single-post-box-header"></div>
        <div className="single-post-community-info-content">
          <div className="single-post-community-info-name">
            <img
              src={
                post !== null
                  ? post?.communitySettings[post?.communityId].communityIcon
                  : community?.communitySettings[community?.id].communityIcon
              }
              alt="Community"
              className="single-post-community-info-img"
            />
            c/{post?.communityName || community?.name}
          </div>
          <div className="single-post-community-description">
            {post?.communityDesc || community?.description}
          </div>
          <div className="single-post-community-date">
            <img src={Cake} className="single-post-community-cake" alt="Cake" />{" "}
            Created {moment(post?.communityDate).format("MMM DD, YYYY")}
          </div>
          <div className="community-page-box-members">
            <h2>{members}</h2>
            <span>{members === 1 ? "Member" : "Members"}</span>
          </div>
          <div className="single-post-right-col-btns">
            {user && subscribed && (
              <button
                className={`blue-btn-unfilled btn-long community-btn`}
                onClick={handleUnsubscribe}
                onMouseEnter={() => setSubscribeBtnText("Leave")}
                onMouseLeave={() => setSubscribeBtnText("Joined")}
              >
                {subscribeBtnText}
              </button>
            )}
            {user && !subscribed && (
              <button
                className="blue-btn-filled btn-long community-btn-filled"
                onClick={handleSubscribe}
              >
                Join
              </button>
            )}
            {!user && (
              <button
                className="blue-btn-filled btn-long community-btn-filled"
                onClick={handleLoggedOutClick}
              >
                Join
              </button>
            )}
          </div>
          <CommunityOptions community={community} />
        </div>
      </div>
    </NavLink>
  );
}
