import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
} from "@/store";
import { CommunityOptions } from "./CommunityInfoBox";
import { useHistory } from "react-router-dom";
import { LoginSignupModal } from "@/features/Auth";
import { CommunityImg } from "@/components/CommunityImg";
import { useCommunitySettings } from "@/features";
import { useAuthFlow } from "@/context/AuthFlowContext";
import { CakeIcon } from "@/assets";

export function CommunityDetails({ post, community }) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector((state) => state.subscriptions);
  const user = useAppSelector((state) => state.session.user);

  const { openSignupPage1 } = useAuthFlow();

  const { checked, setChecked } = useCommunitySettings(community);
  const [subscribed, setSubscribed] = useState(
    subscriptions[post?.community.id] || subscriptions[community?.id]
  );
  const [subscribeBtnText, setSubscribeBtnText] = useState("Leave");
  const communities = useAppSelector((state) =>
    Object.values(state.communities)
  );
  const communityId = post?.community.id;
  const members = communities[communityId]?.members || community?.members || 0;

  useEffect(() => {
    setSubscribed(
      subscriptions[post?.community.id] || subscriptions[community?.id]
    );
  }, [post, community]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await dispatch(addToSubscriptions(post?.community.id));
    setSubscribed(true);
    dispatch(getSubscriptions());
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    await dispatch(deleteSubscription(post?.community.id));
    setSubscribed(false);
  };

  return (
    <div className="single-post-community-box">
      <div className="single-post-box-header"></div>
      <div className="single-post-community-info-content">
        <div className="single-post-community-info-name">
          <CommunityImg
            imgSrc={
              post !== null
                ? communities[communityId].communitySettings[communityId]
                    ?.communityIcon
                : community?.communitySettings?.[community?.id]?.communityIcon
            }
            imgAlt="Community"
            imgClass="single-post-community-info-img"
          />
          <NavLink
            to={`/c/${post !== null ? post?.community.name : community?.name}`}
          >
            c/{post?.community.name || community?.name}
          </NavLink>
        </div>
        <div className="single-post-community-description">
          {communities[communityId]?.description || community?.description}
        </div>
        <div className="single-post-community-date">
          <span className="community-cake-icon">
            <CakeIcon />
          </span>
          Created {communities[communityId]?.createdAt.format("MMM DD, YYYY")}
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
              onClick={!user ? openSignupPage1 : handleSubscribe}
            >
              Join
            </button>
          )}
        </div>

        <CommunityOptions
          checked={checked}
          setChecked={setChecked}
          community={community}
        />
      </div>
    </div>
  );
}
