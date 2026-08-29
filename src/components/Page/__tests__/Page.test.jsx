/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
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
  const originalRequestAnimationFrame = window.requestAnimationFrame;
  const originalCancelAnimationFrame = window.cancelAnimationFrame;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

  const trackedAnchors = [
    { id: "entry", title: "Entry", title2: "Entry", level: 2 },
    { id: "output", title: "Output", title2: "Output", level: 3 },
  ];

  beforeEach(() => {
    mockLocation = { pathname: "/test", hash: "" };
    Object.defineProperty(window, "requestAnimationFrame", {
      configurable: true,
      value: jest.fn((callback) => {
        callback();
        return 1;
      }),
    });
    Object.defineProperty(window, "cancelAnimationFrame", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    if (originalRequestAnimationFrame) {
      window.requestAnimationFrame = originalRequestAnimationFrame;
    } else {
      delete window.requestAnimationFrame;
    }
    if (originalCancelAnimationFrame) {
      window.cancelAnimationFrame = originalCancelAnimationFrame;
    } else {
      delete window.cancelAnimationFrame;
    }
    if (originalScrollIntoView) {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    } else {
      delete HTMLElement.prototype.scrollIntoView;
    }

    jest.restoreAllMocks();
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

  it("sets initial active sidebar section from h2 and h3 heading positions", () => {
    const setActiveSection = jest.fn();
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function getBoundingClientRect() {
        if (this.id === "entry") {
          return { top: 80, bottom: 100, height: 20 };
        }

        if (this.id === "output") {
          return { top: 420, bottom: 440, height: 20 };
        }

        return { top: 0, bottom: 0, height: 0 };
      });

    render(
      <MemoryRouter>
        <Page
          content={
            '<h2 id="entry">Entry</h2><p>Entry content</p><h3 id="output">Output</h3><h4 id="ignored">Ignored</h4>'
          }
          title="Test"
          path="/test"
          anchors={trackedAnchors}
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

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
          anchors={trackedAnchors}
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    expect(setActiveSection).toHaveBeenCalledWith("output");
  });

  it("updates active sidebar section from scroll position when no observer heading is visible", () => {
    const setActiveSection = jest.fn();

    render(
      <MemoryRouter>
        <Page
          content={
            '<h2 id="entry">Entry</h2><p>Entry content</p><h3 id="output">Output</h3>'
          }
          title="Test"
          path="/test"
          anchors={trackedAnchors}
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    Object.defineProperty(
      document.getElementById("entry"),
      "getBoundingClientRect",
      {
        configurable: true,
        value: () => ({ top: -200, bottom: -180, height: 20 }),
      },
    );
    Object.defineProperty(
      document.getElementById("output"),
      "getBoundingClientRect",
      {
        configurable: true,
        value: () => ({ top: 90, bottom: 110, height: 20 }),
      },
    );

    fireEvent.scroll(window);

    expect(setActiveSection).toHaveBeenCalledWith("output");
  });

  it("tracks only h2 and h3 headings that have matching sidebar anchors", () => {
    const setActiveSection = jest.fn();

    render(
      <MemoryRouter>
        <Page
          content={
            '<h2 id="entry">Entry</h2><h3 id="output">Output</h3><h2 id="not-in-sidebar">Ignored</h2>'
          }
          title="Test"
          path="/test"
          anchors={trackedAnchors}
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>,
    );

    Object.defineProperty(
      document.getElementById("not-in-sidebar"),
      "getBoundingClientRect",
      {
        configurable: true,
        value: () => ({ top: 60, bottom: 80, height: 20 }),
      },
    );
    fireEvent.scroll(window);

    expect(setActiveSection).not.toHaveBeenCalledWith("not-in-sidebar");
  });

  it("resets the active sidebar section when pathname changes", () => {
    const setActiveSection = jest.fn();
    const renderPage = () => (
      <MemoryRouter>
        <Page
          content={'<h2 id="entry">Entry</h2>'}
          title="Test"
          path="/test"
          anchors={[trackedAnchors[0]]}
          setActiveSection={setActiveSection}
        />
      </MemoryRouter>
    );
    const { rerender } = render(renderPage());

    setActiveSection.mockClear();
    mockLocation = { pathname: "/next", hash: "" };
    rerender(renderPage());

    expect(setActiveSection).toHaveBeenNthCalledWith(1, "");
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
  });
});
