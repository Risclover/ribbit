const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

export function parseLinkText({ content }) {
  const words = String(parse(content)).split(" ");
  return (
    <p>
      {words.map((word) => {
        return word.match(URL_REGEX) ? (
          <a href={word} rel="noreferrer" target="_blank">
            {word + " "}
          </a>
        ) : (
          word + " "
        );
      })}
    </p>
  );
}
