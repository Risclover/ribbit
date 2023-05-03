import React, { useEffect, useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import Compact from "../../../images/post-format-icons/compact-grey.png";
import CompactBlack from "../../../images/post-format-icons/compact.png";
import CompactColored from "../../../images/post-format-icons/compact-colored.png";
import Classic from "../../../images/post-format-icons/classic-grey.png";
import ClassicBlack from "../../../images/post-format-icons/classic.png";
import ClassicColored from "../../../images/post-format-icons/classic-colored.png";
import Card from "../../../images/post-format-icons/card-grey.png";
import CardBlack from "../../../images/post-format-icons/card.png";
import CardColored from "../../../images/post-format-icons/card-colored.png";
import "./PostFormatDropdown.css";
import PostFormatDropdown from "./PostFormatDropdown";
import HandleClickOutside from "../../../components/HandleClickOutside";

export default function PostFormatFace({ setFormat, format }) {
  const wrapperRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const formats = [
    { format: "Card", img: Card, colored: CardColored, black: CardBlack },
    {
      format: "Classic",
      img: Classic,
      colored: ClassicColored,
      black: ClassicBlack,
    },
    {
      format: "Compact",
      img: Compact,
      colored: CompactColored,
      black: CompactBlack,
    },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
      });
    };
  }, [wrapperRef, showDropdown]);

  return (
    <div className="post-format-face-wrapper" ref={wrapperRef}>
      <button
        className="post-format-face"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {format === "Card" && <img src={Card} alt="Card" />}
        {format === "Classic" && <img src={Classic} alt="Classic" />}
        {format === "Compact" && <img src={Compact} alt="Compact" />}
        <TbChevronDown />
      </button>
      {showDropdown && (
        <PostFormatDropdown
          format={format}
          setFormat={setFormat}
          setShowDropdown={setShowDropdown}
          formats={formats}
        />
      )}
    </div>
  );
}
