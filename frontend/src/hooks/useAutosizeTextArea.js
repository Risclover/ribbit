import { useEffect } from "react";

export const useAutosizeTextArea = (textAreaRef, value) => {
  let heightNum;

  if (value === "Title") {
    heightNum = 7;
  } else {
    heightNum = 0;
  }

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight + heightNum;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
