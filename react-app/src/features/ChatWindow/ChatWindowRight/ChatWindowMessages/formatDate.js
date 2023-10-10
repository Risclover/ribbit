const formatDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const messageDate = new Date(date).setHours(0, 0, 0, 0);

  if (messageDate === today) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDate === yesterday.setHours(0, 0, 0, 0)) {
    return "Yesterday";
  }

  const options = { month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export default formatDate;
