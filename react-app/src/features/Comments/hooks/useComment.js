import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { convertTime } from "../utils/convertTime";
import { usePopup } from "context/Popup";
import { getComments } from "store";
import { removeComment } from "store";
import { getPosts } from "store";

export default function useComment({ comment, commentId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { postId } = useParams();

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [showPopup, setShowPopup] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const { isPopupOpen, setIsPopupOpen } = usePopup();

  const currentUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const post = useSelector((state) => state.posts[postId]);
  const communities = useSelector((state) => state.communities);

  const editedTime = convertTime(comment, "edit");
  const commentTime = convertTime(comment);

  let foundUser = users.filter(
    (user) => user.username === comment.commentAuthor?.username
  );

  const wasEdited = comment?.createdAt !== comment?.updatedAt;

  const handleMouseEnter = () => {
    if (foundUser[0].id === currentUser?.id) {
      return;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    if (!isPopupOpen) {
      setShowPopup(true);
      setIsPopupOpen(true);
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
      setIsPopupOpen(false);
    }, 200);
    setHideTimeout(timeout);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setShowDeleteModal(false);
    dispatch(removeComment(commentId));
    dispatch(getPosts());
  };

  const handleUserImgClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/users/${comment?.commentAuthor?.id}/profile`);
  };

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleEditComment = () => {
    setShowEditCommentModal(true);
  };

  if (!comment) {
    console.error("useComment: comment is undefined");
    return {
      // Return default values or handle the case appropriately
      postId: null,
      showEditCommentModal: false,
      setShowEditCommentModal: () => {},
      showDeleteModal: false,
      setShowDeleteModal: () => {},
      collapsed: false,
      setCollapsed: () => {},
      showReplyForm: false,
      setShowReplyForm: () => {},
      commentContent: "",
      setCommentContent: () => {},
      showPopup: false,
      setShowPopup: () => {},
      hideTimeout: null,
      setHideTimeout: () => {},
      post: null,
      communities: null,
      currentUser: null,
      users: [],
      editedTime: "",
      commentTime: "",
      handleMouseEnter: () => {},
      handleMouseLeave: () => {},
      handleDeleteClick: () => {},
      handleUserImgClick: () => {},
      handleReplyClick: () => {},
      handleEditComment: () => {},
      wasEdited: false,
    };
  }

  return {
    postId,
    showEditCommentModal,
    setShowEditCommentModal,
    showDeleteModal,
    setShowDeleteModal,
    collapsed,
    setCollapsed,
    showReplyForm,
    setShowReplyForm,
    commentContent,
    setCommentContent,
    showPopup,
    setShowPopup,
    hideTimeout,
    setHideTimeout,
    post,
    communities,
    currentUser,
    users,
    editedTime,
    commentTime,
    handleMouseEnter,
    handleMouseLeave,
    handleDeleteClick,
    handleUserImgClick,
    handleReplyClick,
    handleEditComment,
    wasEdited,
  };
}
