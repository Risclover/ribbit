import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import SearchDude from "../../images/search-icon.png";
import RibbitBanner from "../../images/ribbit-banners/ribbit_banner.png";
import "./SearchResults.css";
import { Modal } from "../../context/Modal";
import CreateCommunity from "../../components/Modals/CreateCommunityModal";
import BackToTop from "../../components/BackToTop";
import { useSelector } from "react-redux";
import LoginSignupModal from "../../components/Modals/LoginSignupModal";

export default function SearchResultsPosts({
  posts,
  searchQuery,
  setSearchQuery,
  setAdjustQuery,
  communityList,
  userList,
  setSearchPage,
}) {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="search-results-posts-page">
      <div className="search-results-left">
        {posts
          .filter((post) =>
            post["title"].toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(
            (post) =>
              post["title"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) && (
                <NavLink to={`/posts/${post.id}`}>
                  <div className="search-results-post">
                    <div className="search-results-post-topbar">
                      <img src={post.communityImg} alt="Community" />
                      <NavLink
                        className="results-post-community"
                        to={`/c/${post.communityId}`}
                      >
                        c/{post.communityName}
                      </NavLink>{" "}
                      <span className="topbar-dot">•</span>{" "}
                      <span className="results-topbar-info">
                        Posted by{" "}
                        <NavLink to={`/users/${post.postAuthor.id}/profile`}>
                          <span className="results-post-author">
                            u/{post.postAuthor.username}
                          </span>
                        </NavLink>{" "}
                        {moment(new Date(post.createdAt)).fromNow()}
                      </span>
                    </div>
                    <div className="search-results-post-content">
                      <h3 className="search-results-post-title">
                        {post.title}
                      </h3>
                      {post.imgUrl !== null && (
                        <img
                          className="search-results-post-img"
                          src={post.imgUrl}
                          alt="Post"
                        />
                      )}
                    </div>
                    <div className="search-results-post-stats">
                      <span className="search-results-post-stat">
                        {post.votes} {post.votes === 1 ? "upvote" : "upvotes"}
                      </span>
                      <span className="search-results-post-stat">
                        {Object.values(post.postComments).length} comments
                      </span>
                    </div>
                  </div>
                </NavLink>
              )
          )}
        {posts.length === 0 && (
          <div className="no-search-results">
            <img src={SearchDude} alt="Search Dude" />
            <h2>Hm... we couldn't find any results for “{searchQuery}”</h2>
            <p>
              Double-check your spelling or try different keywords to{" "}
              <span onClick={() => setAdjustQuery(true)}>
                adjust your search
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="search-results-right">
        <div className="search-results-right-box">
          <h4>Communities</h4>
          {communityList
            .filter((community) =>
              community["name"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((community, idx) =>
              idx < 5 &&
              community["name"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ? (
                <NavLink to={`/c/${community.id}`}>
                  <div
                    className="search-result-page-community"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    <div className="search-result-page-community-left">
                      <div className="search-result-page-community-img">
                        <img src={community.communityImg} alt="Community" />
                        &nbsp;
                      </div>
                      <div className="search-result-community-details">
                        <div className="search-result-page-community-name">
                          c/{community.name}
                        </div>
                        <div className="search-result-page-community-members">
                          {community.members} members
                        </div>
                      </div>
                    </div>
                    <div className="search-result-page-community-right">
                      {/* <JoinBtn community={community} /> */}
                    </div>
                  </div>
                </NavLink>
              ) : (
                ""
              )
            )}
          {communityList.filter((community) =>
            community["name"].toLowerCase().includes(searchQuery.toLowerCase())
          ).length > 5 && (
            <div
              className="see-more-btn"
              onClick={() => setSearchPage("Communities")}
            >
              See more communities
            </div>
          )}
          {communityList.filter((community) =>
            community["name"].toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && <div className="no-results">No results</div>}
        </div>

        <div className="search-results-right-box">
          <h4>People</h4>
          {userList
            .filter((user) =>
              user["username"].toLowerCase().includes(searchQuery.toLowerCase())
            )
            // .slice(0, 5)
            .map((user, idx) =>
              idx < 5 &&
              user["username"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ? (
                <NavLink to={`/users/${user.id}/profile`}>
                  <div
                    className="search-result-page-community"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    <div className="search-result-page-community-left">
                      <div className="search-result-page-community-img">
                        <img src={user?.profile_img} alt="User" />
                      </div>
                      <div className="search-result-page-community-details">
                        <div className="search-result-page-community-name">
                          u/{user.username}
                        </div>
                        <div className="search-result-page-community-members">
                          {user.karma} karma
                        </div>
                      </div>
                    </div>
                    <div className="search-result-page-community-right">
                      {/* <button
                        className="search-results-page-person-join"
                        onClick={(e) => e.preventDefault()}
                      >
                        Follow
                      </button> */}
                    </div>
                  </div>
                </NavLink>
              ) : (
                ""
              )
            )}
          {userList.filter((user) =>
            user["username"].toLowerCase().includes(searchQuery.toLowerCase())
          ).length > 5 && (
            <div
              className="see-more-btn"
              onClick={() => setSearchPage("People")}
            >
              See more people
            </div>
          )}
          {userList.filter((user) =>
            user["username"].toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && <div className="no-results">No results</div>}
        </div>
        <div className="last-box-wrapper">
          <div className="search-results-right-box search-results-create-community">
            <img src={RibbitBanner} alt="Ribbit Banner" />
            <div className="search-results-create-community-box">
              <p>Have an idea for a new community?</p>
              {currentUser && (
                <button
                  className="blue-btn-unfilled btn-long"
                  onClick={() => setShowCommunityModal(true)}
                >
                  Create Community
                </button>
              )}
              {!currentUser && (
                <LoginSignupModal
                  btnText="Log In/Sign Up?"
                  className="blue-btn-filled btn-long"
                />
              )}
            </div>
          </div>
          {showCommunityModal && (
            <Modal
              onClose={() => setShowCommunityModal(false)}
              title="Create a community"
            >
              <CreateCommunity
                showCreateCommunityModal={showCommunityModal}
                setShowCreateCommunityModal={setShowCommunityModal}
              />
            </Modal>
          )}
          <BackToTop />
        </div>
      </div>
    </div>
  );
}
