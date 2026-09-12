/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
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
});
