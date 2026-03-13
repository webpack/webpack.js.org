/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import Page from "../Page";

// Mock components that cause unrelated failures
jest.mock("../../Contributors/Contributors.jsx", () => () => <div />);
jest.mock("../../PageLinks/PageLinks.jsx", () => () => <div />);

// Mock react-router hook used inside Page
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({ pathname: "/test", hash: "" }),
}));

// Mock scrollTo (jsdom doesn't support it)
window.scrollTo = jest.fn();

describe("Page component", () => {
  it("renders error message when content.__error exists", async () => {
    const content = {
      __error: true,
      message: "Failed to load content",
    };

    render(
      <MemoryRouter>
        <Page content={content} title="Test" path="/test" />
      </MemoryRouter>,
    );

    const errorElement = await screen.findByText(/failed to load content/i);
    expect(errorElement).toBeInTheDocument();
  });
});
