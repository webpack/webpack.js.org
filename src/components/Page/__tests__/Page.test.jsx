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

  it("focuses heading matching URL hash on render", async () => {
    jest.useFakeTimers();

    const content = () => (
      <div>
        <h2>
          <span id="target-section" />
          Target Section
        </h2>
      </div>
    );

    window.HTMLElement.prototype.scrollIntoView = () => {};

    render(
      <MemoryRouter initialEntries={["/guides/#target-section"]}>
        <Page content={content} title="Guides" path="/guides/" />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { name: "Target Section" });

    jest.advanceTimersByTime(100);

    expect(heading.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(heading);

    jest.useRealTimers();
  });

  it("does not steal focus if the user changes focus before hash focus runs", async () => {
    jest.useFakeTimers();

    const content = () => (
      <div>
        <h2>
          <span id="target-section" />
          Target Section
        </h2>
        <input data-testid="search-input" />
      </div>
    );

    window.HTMLElement.prototype.scrollIntoView = () => {};

    render(
      <MemoryRouter initialEntries={["/guides/#target-section"]}>
        <Page content={content} title="Guides" path="/guides/" />
      </MemoryRouter>,
    );

    const input = screen.getByTestId("search-input");
    input.focus();

    jest.advanceTimersByTime(100);

    const heading = screen.getByRole("heading", { name: "Target Section" });
    expect(document.activeElement).toBe(input);
    expect(document.activeElement).not.toBe(heading);

    jest.useRealTimers();
  });
});
