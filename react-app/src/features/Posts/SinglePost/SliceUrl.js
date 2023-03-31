function cutLink(text) {
  let sliced;

  if (text.slice(0, 12) === "https://www.") {
    sliced = text.slice(12);
  } else if (text.slice(0, 11) === "http://www.") {
    sliced = text.slice(11);
  } else if (
    text.slice(0, 8) === "https://" &&
    text.slice(0, 12) !== "https://www."
  ) {
    sliced = text.slice(8);
  } else if (
    text.slice(0, 7) === "http://" &&
    text.slice(0, 11) !== "http://www."
  ) {
    sliced = text.slice(7);
  } else if (text.slice(0, 4) === "www.") {
    sliced = text.slice(4);
  } else {
    sliced = text;
  }

  let firstSlash = sliced.indexOf("/");

  if (sliced[firstSlash + 8] === undefined) {
    return sliced;
  } else {
    return sliced.slice(0, firstSlash + 7) + "...";
  }
}

export default cutLink;
