import moment from "moment";

export function convertTime(comment, type) {
  const editedTime = moment(new Date(comment?.updatedAt))
    .locale("en-comment")
    .fromNow();

  const commentTime = moment(new Date(comment?.createdAt))
    .locale("en-comment")
    .fromNow();

  return type === "edit" ? editedTime : commentTime;
}
