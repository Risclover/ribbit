import parse from "html-react-parser";
import { URL_REGEX } from "../data/constants";

export function CommentText({ content }) {
  if (typeof parse(content) !== "string") {
    return content;
  } else if (typeof parse(content) === "string") {
    const words = String(parse(content)).split(" ");
    return (
      <p>
        {words.map((word) => {
          return word.match(URL_REGEX) ? (
            <>
              <a href={word} rel="noreferrer" target="_blank">
                {word}
              </a>{" "}
            </>
          ) : (
            word + " "
          );
        })}
      </p>
    );
  }
}
