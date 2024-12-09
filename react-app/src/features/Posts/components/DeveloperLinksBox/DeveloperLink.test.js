import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DeveloperLink } from "./DeveloperLink";

describe("DeveloperLink Component", () => {
  const linkProps = {
    title: "GitHub",
    link: "https://www.github.com/Risclover",
    imgsrc: "github-icon.png",
    alt: "GitHub Icon",
  };

  it("renders correctly", () => {
    render(<DeveloperLink {...linkProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", linkProps.link);
    expect(screen.getByRole("img")).toHaveAttribute("src", linkProps.imgsrc);
    expect(screen.getByRole("img")).toHaveAttribute("alt", linkProps.alt);
    expect(screen.getByText(linkProps.title)).toBeInTheDocument();
  });
});
