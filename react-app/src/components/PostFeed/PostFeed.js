import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { SinglePost } from "@/features";
import { SortingBar } from "../SortingBar";
import { useHistory } from "react-router-dom";
import { Modal } from "context";
import { PostModal } from "context/PostModal";
import { PostPopup } from "components/PostPopup/PostPopup";
import { Link } from "react-router-dom";

export function PostFeed({
  posts,
  sortMode,
  isPage,
  format,
  setSortMode,
  community,
  pageType,
  user,
}) {
  const history = useHistory();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (posts) {
      setItems(posts.slice(0, 10 * page));
    }
  }, [posts, page, sortMode]);

  const loadMore = () => {
    if (!loading && items.length < posts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage(page + 1);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading &&
        items.length < posts.length
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, loading, posts.length]);

  useEffect(() => {
    if (isPage === "profile") {
      document.documentElement.style.setProperty(
        "--community-highlight",
        "#0079d3"
      );
    }
  }, [isPage]);

  const handlePostClick = (postId) => {
    history.push(`/posts/${postId}`, { fromInternal: true });
  };

  return (
    <div>
      {((isPage === "profile" && user?.userPosts > 0) ||
        isPage !== "profile") && (
        <SortingBar
          sortMode={sortMode}
          setSortMode={setSortMode}
          page={pageType}
          community={community}
          isPage={isPage}
          user={user}
        />
      )}
      {items.map((post) => (
        <div
          key={post.id}
          onClick={(e) => {
            e.stopPropagation();
            handlePostClick(post.id);
          }}
        >
          <SinglePost
            key={post.id}
            id={post.id}
            post={post}
            isPage={isPage}
            format={format}
          />
        </div>
      ))}
    </div>
  );
}
