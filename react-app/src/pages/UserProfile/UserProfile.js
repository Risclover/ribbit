import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCommunities } from "../../store/communities";
import { getFollowedPosts, getPosts } from "../../store/posts";
import { Modal } from "../../context/Modal";

import UploadUserImage from "./UploadUserImage";
import UploadBannerImage from "./UploadBannerImage";

import Camera from "../../images/user-profile-icons/camera.png";
import Flower from "../../images/user-profile-icons/poinsettia.png";
import Cakeday from "../../images/user-profile-icons/cakeday.png";
import { SlArrowRight } from "react-icons/sl";

import "./UserProfile.css";
import { getSubscriptions } from "../../store/subscriptions";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";
import UserProfilePosts from "./UserProfilePosts";
import UserProfileFollowers from "./UserProfileFollowers";
import { getUsers } from "../../store/users";

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => state.users[+userId]);

  const [page, setPage] = useState("Posts");
  const [banner, setBanner] = useState();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [karma, setKarma] = useState();
  const [sortMode, setSortMode] = useState("new");
  const [communitiesList, setCommunitiesList] = useState([]);
  const [following, setFollowing] = useState(false);

  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const followers = useSelector((state) => state.followers.followers);
  const follows = useSelector((state) => state.followers.follows);
  const userFollowers = useSelector((state) => state.followers.userFollowers);

  useEffect(() => {
    setBanner(user?.bannerImg);
  }, [userId, user?.bannerImg]);

  useEffect(() => {
    setPage("Posts");
    dispatch(getCommunities());
    dispatch(getUserFollowers(+userId));
    dispatch(getFollowedPosts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (follows) {
      for (let followed of Object.values(follows)) {
        if (followed?.username === user?.username) {
          setFollowing(true);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    let communityList = [];
    for (let community of Object.values(communities)) {
      if (community.communityOwner.username === currentUser.username) {
        communityList.push(community);
      }
    }

    let postsList = [];
    for (let post of posts) {
      if (post.postAuthor.id === +userId) {
        postsList.push(post);
      }
    }
  }, [currentUser.username, userId]);

  useEffect(() => {
    setKarma(user?.karma);
    let list = [];
    for (let community of Object.values(communities)) {
      if (community.communityOwner.id === +userId) {
        list.push(community);
      }
    }

    setCommunitiesList(list);
  }, [userId, karma, user?.karma, user?.profile_img, communities]);

  if (sortMode === "new") {
    posts.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return postB - postA;
    });
  }

  if (sortMode === "top") {
    posts.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return b.votes - a.votes || postB - postA;
    });
  }

  const handleFollow = async () => {
    await dispatch(followUser(user.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user.id));
    setFollowing(!following);
  };

  if (!user || !follows || !user) {
    return null;
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-left-col">
        {page === "Posts" && (
          <UserProfilePosts
            posts={posts}
            user={user}
            userId={userId}
            sortMode={sortMode}
            setSortMode={setSortMode}
          />
        )}
        {showFollowersModal && (
          <Modal onClose={() => setShowFollowersModal(false)} title="Followers">
            <UserProfileFollowers
              setShowFollowersModal={setShowFollowersModal}
            />
          </Modal>
        )}
      </div>
      <div className="user-profile-right-col">
        <div className="user-profile-about-box">
          <div className="user-profile-about-box-banner">
            {banner === null ? (
              ""
            ) : (
              <img src={banner} className="user-profile-banner" alt="Banner" />
            )}
            {currentUser.id === +userId && (
              <div
                className="user-profile-banner-upload-btn"
                onClick={() => setShowBannerModal(true)}
              >
                <img src={Camera} alt="Camera" />
              </div>
            )}
          </div>
          {showBannerModal && (
            <Modal
              onClose={() => setShowBannerModal(false)}
              title="Change Profile Banner"
            >
              <UploadBannerImage
                setShowBannerModal={setShowBannerModal}
                showBannerModal={showBannerModal}
                img_url={user?.bannerImg}
                userId={currentUser.id}
              />
            </Modal>
          )}
          <div className="user-profile-img-box">
            {currentUser.id === +userId && (
              <div
                className="user-profile-upload-btn"
                onClick={() => setShowUploadModal(true)}
              >
                <img src={Camera} alt="Camera" />
              </div>
            )}
            <img
              src={user?.profile_img}
              alt="User"
              className="user-profile-img"
            />
          </div>
          {showUploadModal && (
            <Modal
              onClose={() => setShowUploadModal(false)}
              title="Change User Image"
            >
              <UploadUserImage
                setShowUploadModal={setShowUploadModal}
                showUploadModal={showUploadModal}
                img_url={user?.profile_img}
                userId={currentUser.id}
              />
            </Modal>
          )}
          <div className="user-profile-about-content">
            {currentUser.id === +userId && (
              <NavLink to={`/users/${userId}/profile/edit`}>
                <i className="fa-solid fa-gear user-settings"></i>
              </NavLink>
            )}
            <h1 className="user-profile-display-name">{user.displayName}</h1>
            <div className="user-profile-username-year">
              <span>u/{user.username}</span>
            </div>
            <div className="user-profile-about">{user.about}</div>
            <div className="user-profile-stats-box">
              <div className="user-profile-stats stats-karma">
                <h5>Karma</h5>
                <div className="stats-stats">
                  <img src={Flower} className="stats-icon" alt="Flower" />{" "}
                  <span className="stats-label">{karma}</span>
                </div>
              </div>
              <div className="user-profile-stats stats-cakeday">
                <h5>Cake day</h5>
                <div className="stats-stats">
                  <img src={Cakeday} className="stats-icon" alt="Cakeday" />
                  <span className="stats-label">
                    {moment(new Date(user.createdAt)).format("MMMM DD, YYYY")}
                  </span>
                </div>
              </div>
              {currentUser.id === user.id && (
                <div
                  className="user-profile-stats stats-followers"
                  onClick={() => setShowFollowersModal(true)}
                >
                  <h5>Followers</h5>
                  <div className="stats-stats">
                    <i className="fa-solid fa-user"></i>
                    <span className="stats-label">
                      {followers && Object.values(followers).length}
                    </span>
                    <SlArrowRight />
                  </div>
                </div>
              )}
            </div>

            {userFollowers && currentUser.id !== +userId && (
              <button
                className={
                  !follows[+userId]
                    ? "blue-btn-filled btn-long"
                    : "blue-btn-unfilled btn-long"
                }
                onClick={handleFollow}
              >
                {!follows[+userId] ? "Follow" : "Unfollow"}
              </button>
            )}
          </div>
        </div>
        {currentUser?.id === +userId && (
          <div className="user-profile-owned-communities">
            {communitiesList.length > 0 ? (
              <h2>You're the owner of these communities.</h2>
            ) : (
              <h2>You aren't the owner of any communities.</h2>
            )}
            <div className="user-profile-owned-communities-box">
              {communitiesList.map((community) =>
                community.communityOwner.id === +userId ? (
                  <div className="profile-owned-community">
                    <div className="profile-owned-community-left">
                      <div className="owned-community-icon">
                        <img src={community.communityImg} alt="Community" />
                      </div>
                      <div className="owned-community-info">
                        <span className="owned-community-title">
                          <NavLink to={`/c/${community.id}`}>
                            c/{community.name}
                          </NavLink>
                        </span>
                        <span className="owned-community-members">
                          {community.members}{" "}
                          {community.members === 1 ? "member" : "members"}
                        </span>
                      </div>
                    </div>
                    {/* <button className="owned-community-join-btn">Join</button> */}
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default UserProfile;
