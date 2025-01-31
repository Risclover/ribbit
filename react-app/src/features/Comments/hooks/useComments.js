import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useComments() {
  const { postId } = useParams();
  const commentsState = useSelector((state) => state.comments);
  const commentsArray = Object.values(commentsState);

  // Example local states
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");

  const nestedComments = useMemo(() => {
    // Some logic to build nested
    // ...
    return [];
  }, [commentsArray]);

  return {
    postId,
    sortType,
    setSortType,
    searchValue,
    setSearchValue,
    nestedComments,
  };
}
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useComments() {
  const { postId } = useParams();
  const commentsState = useSelector((state) => state.comments);
  const commentsArray = Object.values(commentsState);

  // Example local states
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");

  const nestedComments = useMemo(() => {
    // Some logic to build nested
    // ...
    return [];
  }, [commentsArray]);

  return {
    postId,
    sortType,
    setSortType,
    searchValue,
    setSearchValue,
    nestedComments,
  };
}
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useComments() {
  const { postId } = useParams();
  const commentsState = useSelector((state) => state.comments);
  const commentsArray = Object.values(commentsState);

  // Example local states
  const [sortType, setSortType] = useState("New");
  const [searchValue, setSearchValue] = useState("");

  const nestedComments = useMemo(() => {
    // Some logic to build nested
    // ...
    return [];
  }, [commentsArray]);

  return {
    postId,
    sortType,
    setSortType,
    searchValue,
    setSearchValue,
    nestedComments,
  };
}
