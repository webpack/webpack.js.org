/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Page from "../Page.jsx";

let mockLocation = { pathname: "/test", hash: "" };

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
    useLocation: () => mockLocation,
  };
});

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

describe("Page component", () => {
  const originalIntersectionObserver = window.IntersectionObserver;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  let disconnect;
  let intersectionCallback;
  let observe;

  beforeEach(() => {
    mockLocation = { pathname: "/test", hash: "" };
    disconnect = jest.fn();
    observe = jest.fn();
    intersectionCallback = undefined;

    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: jest.fn((callback) => {
        intersectionCallback = callback;

        return {
          disconnect,
          observe,
        };
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    if (originalIntersectionObserver) {
      window.IntersectionObserver = originalIntersectionObserver;
    } else {
      delete window.IntersectionObserver;
    }
    if (originalScrollIntoView) {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    } else {
      delete HTMLElement.prototype.scrollIntoView;
    }

    jest.clearAllMocks();
  });

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

  it("observes page h2 and h3 headings for active sidebar section tracking", () => {
    const setActiveSection = jest.fn();

    render(
      <MemoryRouter>
        <Page
          content={
            '<h2 id="entry">Entry</h2><p>Entry content</p><h3 id="output">Output</h3><h4 id="ignored">Ignored</h4>'
          }
          title="Test"
          path="/test"
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      },
    );
    expect(observe).toHaveBeenCalledTimes(2);
    expect(observe).toHaveBeenCalledWith(document.getElementById("entry"));
    expect(observe).toHaveBeenCalledWith(document.getElementById("output"));

    intersectionCallback([
      {
        boundingClientRect: { top: 160 },
        isIntersecting: true,
        target: document.getElementById("output"),
      },
      {
        boundingClientRect: { top: 80 },
        isIntersecting: true,
        target: document.getElementById("entry"),
      },
    ]);

    expect(setActiveSection).toHaveBeenCalledWith("entry");
  });

  it("sets the active sidebar section from the current hash when it matches a heading", () => {
    const setActiveSection = jest.fn();
    mockLocation = { pathname: "/test", hash: "#output" };

    render(
      <MemoryRouter>
        <Page
          content={
            '<h2 id="entry">Entry</h2><p>Entry content</p><h3 id="output">Output</h3>'
          }
          title="Test"
          path="/test"
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    expect(setActiveSection).toHaveBeenCalledWith("output");
  });

  it("clears active sidebar section when a page has no tracked headings", () => {
    const setActiveSection = jest.fn();

    render(
      <MemoryRouter>
        <Page
          content="<p>No headings here.</p>"
          title="Test"
          path="/test"
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    expect(setActiveSection).toHaveBeenCalledWith("");
    expect(window.IntersectionObserver).not.toHaveBeenCalled();
  });
});
