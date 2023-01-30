import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UploadPicture from "../UploadPicture";
import "./UserProfile.css";
import SortingBar from "../Posts/SortingBar/SortingBar";
import moment from "moment";
import Camera from "../../images/camera.png";
import Flower from "../../images/poinsettia.png";
import Cakeday from "../../images/cakeday.png";
import User from "../../images/user1.png";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import SinglePost from "../Posts/SinglePost/SinglePost";

function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [image, setImage] = useState();
  const [img_url, setimg_url] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [banner, setBanner] = useState();
  const [userCommunities, setUserCommunities] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    setBanner(user.bannerImg);
  }, [userId, user.bannerImg]);

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

    console.log(postsList);

    setUserPosts(postsList);
  }, []);

  const currentUser = useSelector((state) => state.session.user);

  const showPreview = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      let src = URL.createObjectURL(file);
    }
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
    formData.append("image", image);

    setImageLoading(true);

    const res = await fetch(`/api/users/${userId}/img/${"banner"}`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      console.log("IMAGE DATA", data);
      setImageLoading(false);
      setimg_url(data.url);
      history.push(`/users/${+userId}`);

      // return data;
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch(`/api/users/${+userId}/img/profile`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push(`/users/${+userId}`);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    handleSubmit(e);
  };

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
          <label htmlFor="banner-upload">
            <div className="user-profile-about-box-banner">
              <img src={banner} className="user-profile-banner" />
              {currentUser.id === +userId && (
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerSubmit}
                  hidden
                />
              )}
              {currentUser.id === +userId && (
                <div className="user-profile-banner-upload-btn">
                  <img src={Camera} />
                </div>
              )}
            </div>
          </label>
          <div className="user-profile-img-box">
            {currentUser.id === +userId && (
              <label htmlFor="profile-upload">
                <div className="user-profile-upload-btn">
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                    hidden
                  />
                  <img src={Camera} />
                </div>
              </label>
            )}
            <img src={user.profile_img} className="user-profile-img" />
          </div>
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
