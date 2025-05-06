import { useState, useEffect, useContext } from "react";
import { PostFormatContext } from "@/context";

export function useButtonState(item) {
  const { format, setFormat } = useContext(PostFormatContext);
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setActive(item.format === format);
  }, [item.format, format]);

  return { active, setActive, highlight, setHighlight, setFormat };
}
