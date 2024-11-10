import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";

export function Text({ content }) {
  const URL_REGEX =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

  if (typeof parse(content) !== "string") {
    return content;
  } else if (typeof parse(content) === "string") {
    const words = String(parse(content)).split(" ");
    return (
      <p>
        {words.map((word) => {
          return word.match(URL_REGEX) ? (
            <a key={uuidv4()} href={word} rel="noreferrer" target="_blank">
              {word + " "}
            </a>
          ) : (
            word + " "
          );
        })}
      </p>
    );
  }
}
