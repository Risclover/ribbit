jest.mock("../data/developerLinksData", () => ({
  developerLinks: [
    {
      title: "Portfolio",
      link: "https://portfolio.com",
      imgsrc: "portfolio-icon.png",
      alt: "Portfolio Icon",
    },
    {
      title: "LinkedIn",
      link: "https://linkedin.com",
      imgsrc: "linkedin-icon.png",
      alt: "LinkedIn Icon",
    },
  ],
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DeveloperLinksBox } from "./DeveloperLinksBox";

describe("DeveloperLinksBox Component", () => {
  it("renders the correct number of links", () => {
    render(<DeveloperLinksBox />);
    const links = screen.getAllByRole("link");
    const images = screen.getAllByRole("img");
    expect(links).toHaveLength(2);
    expect(images).toHaveLength(2);
  });
});
