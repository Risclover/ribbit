import React from "react";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";

/**
 * A comment's text, rendered to follow specific rules (i.e. render links, show formatting, etc.)
 * - content: the comment's content
 */
export function Text({ content }) {
  const URL_REGEX =
    /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,63}(:\d{1,5})?(\/\S*)?$/i;

  if (!content || typeof content !== "string") {
    return null;
  }

  const normalizeUrl = (url) => {
    // If the URL doesn't start with a scheme, add https://
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) {
      return "https://" + url;
    }
    return url;
  };

  const options = {
    replace: (node) => {
      // If the node is within a <code> or <pre> tag, skip linkification
      if (
        node.parent &&
        (node.parent.name === "code" || node.parent.name === "pre")
      ) {
        return undefined; // Do not replace, leave as is
      }

      if (node.type === "text") {
        const words = node.data.split(" ");
        return (
          <>
            {words.map((word, idx) => {
              if (URL_REGEX.test(word)) {
                return (
                  <React.Fragment key={uuidv4()}>
                    <a
                      href={normalizeUrl(word)}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {word}
                    </a>{" "}
                  </React.Fragment>
                );
              }
              const isLast = idx === words.length - 1;
              return isLast ? word : word + " ";
            })}
          </>
        );
      }
    },
  };

  return <>{parse(content, options)}</>;
}
