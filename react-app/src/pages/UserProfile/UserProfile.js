import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getUsers } from "../../store/users";

import SortingBar from "../../components/SortingBar/SortingBar";
import SinglePost from "../../features/Posts/SinglePost/SinglePost";
import { Modal } from "../../context/Modal";

import UploadUserImage from "./UploadUserImage";
import UploadBannerImage from "./UploadBannerImage";

import Camera from "../../images/user-profile-icons/camera.png";
import Flower from "../../images/user-profile-icons/poinsettia.png";
import Cakeday from "../../images/user-profile-icons/cakeday.png";

import "./UserProfile.css";

function UserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => state.users[userId]);

  const [banner, setBanner] = useState();
  const [userCommunities, setUserCommunities] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [img_url, setimg_url] = useState();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);

  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    setBanner(user?.bannerImg);
  }, [userId, user?.bannerImg]);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());

    let communityList = [];
    for (let community of Object.values(communities)) {
      if (community.communityOwner.username === currentUser.username) {
        communityList.push(community);
      }
    }
    setUserCommunities(communityList);

    let postsList = [];
    for (let post of Object.values(posts)) {
      if (post.postAuthor.id === +userId) {
        postsList.push(post);
      }
    }
    setUserPosts(postsList);
  }, []);

  useEffect(() => {
    dispatch(getUsers());
    console.log(user?.profile_img);
  }, [user?.profile_img]);

  const currentUser = useSelector((state) => state.session.user);

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-left-col">
        <SortingBar />
        {Object.values(posts).map((post) =>
          post.postAuthor.id === +userId ? (
            <NavLink to={`/posts/${post.id}`}>
              <SinglePost
                key={post.id}
                id={post.id}
                isCommunity={false}
                isPage="profile"
                userId={+userId}
              />
            </NavLink>
          ) : (
            ""
          )
        )}
      </div>
      <div className="user-profile-right-col">
        <div className="user-profile-about-box">
          <div className="user-profile-about-box-banner">
            <img src={banner} className="user-profile-banner" />
            {currentUser.id === +userId && (
              <div
                className="user-profile-banner-upload-btn"
                onClick={() => setShowBannerModal(true)}
              >
                <img src={Camera} />
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
                <img src={Camera} />
              </div>
            )}
            <img src={user?.profile_img} className="user-profile-img" />
          </div>
          {showUploadModal && (
            <Modal
              onClose={() => setShowUploadModal(false)}
              title="Change User Image"
            >
              <UploadUserImage
                setShowUploadModal={setShowUploadModal}
                showUploadModal={showUploadModal}
                setimg_url={setimg_url}
                img_url={user?.profile_img}
                userId={currentUser.id}
              />
            </Modal>
          )}
          <div className="user-profile-about-content">
            {currentUser.id === +userId && (
              <i className="fa-solid fa-gear user-settings"></i>
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
                  <img src={Flower} className="stats-icon" />{" "}
                  <span className="stats-label">
                    {user.likes - user.dislikes}
                  </span>
                </div>
              </div>
              <div className="user-profile-stats stats-cakeday">
                <h5>Cake day</h5>
                <div className="stats-stats">
                  <img src={Cakeday} className="stats-icon" />
                  <span className="stats-label">
                    {moment(new Date(user.createdAt)).format("MMMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </div>
            {currentUser?.id !== +userId && (
              <button className="user-profile-follow-btn">Follow</button>
            )}
          </div>
        </div>
        {currentUser?.id === +userId && (
          <div className="user-profile-owned-communities">
            <h2>You're the owner of these communities.</h2>
            <div className="user-profile-owned-communities-box">
              {Object.values(communities).map((community) =>
                community.communityOwner.id === +userId ? (
                  <div className="profile-owned-community">
                    <div className="profile-owned-community-left">
                      <div className="owned-community-icon">
                        <img src={community.communityImg} />
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
                    <button className="owned-community-join-btn">Join</button>
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
