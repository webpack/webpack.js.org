/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, jest } from "@jest/globals";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

jest.unstable_mockModule("../../Contributors/Contributors.jsx", () => ({
  default: () => <div />,
}));

jest.unstable_mockModule("../../PageLinks/PageLinks.jsx", () => ({
  default: () => <div />,
}));

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: jest.fn(),
  writable: true,
  configurable: true,
});

const { default: Page } = await import("../Page.jsx");

describe("Page component", () => {
  it("renders error message when content.__error exists", async () => {
    const content = {
      __error: true,
      message: "Failed to load page content.",
    };

    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Page content={content} title="Test" path="/test" />
      </MemoryRouter>,
    );

    const errorElement = await screen.findByText(
      /failed to load page content/i,
    );
    expect(errorElement).toBeTruthy();
  });

  it("moves keyboard focus to the heading when navigating to an anchor", () => {
    const content = `
    <h2>
      <span id="introduction"></span>
      Introduction
    </h2>
  `;

    render(
      <MemoryRouter initialEntries={["/test#introduction"]}>
        <Page content={content} title="Test" path="/test" />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", {
      name: "Introduction",
    });

    const anchor = document.getElementById("introduction");

    // Check that keyboard focus moves to the heading.
    expect(document.activeElement).toBe(heading);

    // Check that the heading is not added to the normal Tab order.
    expect(heading.getAttribute("tabindex")).toBe("-1");

    // Check that the original anchor is scrolled into view.
    expect(anchor.scrollIntoView).toHaveBeenCalled();
  });

  it("moves keyboard focus when the heading is added dynamically", async () => {
    render(
      <MemoryRouter initialEntries={["/test#introduction"]}>
        <Page content="" title="Test" path="/test" />
      </MemoryRouter>,
    );

    const contentContainer = document.getElementById("md-content");

    await act(async () => {
      contentContainer.innerHTML = `
      <h2>
        <span id="introduction"></span>
        Introduction
      </h2>
    `;
    });

    const heading = screen.getByRole("heading", {
      name: "Introduction",
    });

    await waitFor(() => {
      expect(document.activeElement).toBe(heading);
    });

    expect(heading.getAttribute("tabindex")).toBe("-1");
    expect(
      document.getElementById("introduction").scrollIntoView,
    ).toHaveBeenCalled();
  });
});
