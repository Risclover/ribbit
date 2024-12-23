import moment from "moment";

export function convertTime(comment, type) {
  moment.updateLocale("en-comment", {
    relativeTime: {
      future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
      past: (diff) => (diff === "just now" ? diff : `${diff} ago`),
      s: "just now",
      ss: "just now",
      m: "1 min.",
      mm: "%d min.",
      h: "1 hr.",
      hh: "%d hr.",
      d: "1 day",
      dd: "%d days",
      M: "1 mo.",
      MM: "%d mo.",
      y: "1 yr.",
      yy: "%d yr.",
    },
  });

  const editedTime = moment(new Date(comment?.updatedAt))
    .locale("en-comment")
    .fromNow();

  const commentTime = moment(new Date(comment?.createdAt))
    .locale("en-comment")
    .fromNow();

  return type === "edit" ? editedTime : commentTime;
}
