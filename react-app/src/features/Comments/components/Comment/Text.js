import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";

export function Text({ content }) {
  const URL_REGEX =
    /^(https?:\/\/(www\.)?|www\.)[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,63}(:\d{1,5})?(\/\S*)?$/gi;

  if (!content || typeof content !== "string") {
    return null;
  }

  // Sanitize the content
  const sanitizedContent = DOMPurify.sanitize(content);

  const normalizeUrl = (url) => {
    // If the URL doesn't start with a scheme, add https://
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) {
      return "https://" + url;
    }
    return url;
  };

  const options = {
    replace: (node) => {
      if (node.type === "text") {
        const words = node.data.split(" ");
        return (
          <>
            {words.map((word) =>
              URL_REGEX.test(word) ? (
                <a
                  key={uuidv4()}
                  href={normalizeUrl(word)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {word + " "}
                </a>
              ) : (
                word + " "
              )
            )}
          </>
        );
      }
    },
  };

  return <>{parse(sanitizedContent, options)}</>;
}
