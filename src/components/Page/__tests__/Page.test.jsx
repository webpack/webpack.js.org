/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Page from "../Page.jsx";

jest.mock("../../Contributors/Contributors.jsx", () => {
  const MockContributors = () => <div />;
  return MockContributors;
});

jest.mock("../../PageLinks/PageLinks.jsx", () => {
  const MockPageLinks = () => <div />;
  return MockPageLinks;
});

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: "/test", hash: "" }),
  };
});

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

describe("Page component", () => {
  it("renders error message when content.__error exists", async () => {
    const content = {
      __error: true,
      message: "Failed to load page content.",
    };

    render(
      <MemoryRouter>
        <Page content={content} title="Test" path="/test" />
      </MemoryRouter>,
    );

    const errorElement = await screen.findByText(
      /failed to load page content/i,
    );
    expect(errorElement).toBeTruthy();
  });
});
