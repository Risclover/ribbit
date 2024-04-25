import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllComments,
  getComments,
  getPostResults,
  getPosts,
  searchComments,
  searchPosts,
} from "../../../store";
import { useDispatch } from "react-redux";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

function PostResults() {
  const dispatch = useDispatch();
  const [results, setResults] = useState();
  const query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const data = await dispatch(searchComments(searchTerm));
      console.log("data:", data);
    };
    // Assuming fetchPostsSearch is an action that fetches the search results
    // and you have some way to dispatch Redux actions
    fetchPosts();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Results for: {searchTerm}</p>
      {/* Display search results */}
    </div>
  );
}

export default PostResults;
