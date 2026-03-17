/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Page from "../Page";

// Mock components that cause unrelated failures
jest.mock("../../Contributors/Contributors.jsx", () => () => <div />);
jest.mock("../../PageLinks/PageLinks.jsx", () => () => <div />);

// Stable mock for react-router-dom (CI safe)
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: "/test", hash: "" }),
  };
});

// Mock scrollTo properly (CI safe)
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

    expect(
      await screen.findByText(/failed to load page content/i),
    ).toBeInTheDocument();
  });
});
