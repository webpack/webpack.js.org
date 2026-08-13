/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidebarItem from "./SidebarItem.jsx";

function renderWithRouter(ui, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("SidebarItem", () => {
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  const originalScrollTo = window.scrollTo;
  let scrollIntoView;

  const defaultProps = {
    title: "Getting Started",
    url: "/guides/getting-started/",
    currentPage: "/guides/",
    anchors: [],
  };

  beforeEach(() => {
    scrollIntoView = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    if (originalScrollIntoView) {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    } else {
      delete HTMLElement.prototype.scrollIntoView;
    }
    if (originalScrollTo) {
      window.scrollTo = originalScrollTo;
    } else {
      delete window.scrollTo;
    }

    jest.clearAllMocks();
  });

  it("renders the title", () => {
    renderWithRouter(<SidebarItem {...defaultProps} />);
    expect(screen.getByText("Getting Started")).toBeTruthy();
  });

  it("renders collapsed by default when not matching currentPage", () => {
    const { container } = renderWithRouter(<SidebarItem {...defaultProps} />);
    const wrapper = container.firstChild;
    expect(wrapper.getAttribute("data-open")).toBeNull();
  });

  it("renders expanded when url matches currentPage", () => {
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} currentPage="/guides/getting-started" />,
    );
    const wrapper = container.firstChild;
    expect(wrapper.getAttribute("data-open")).toBe("true");
  });

  it("toggles open state when chevron button is clicked", () => {
    const anchors = [
      {
        id: "introduction",
        title: "Introduction",
        title2: "Introduction",
        level: 2,
      },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} anchors={anchors} />,
    );

    const wrapper = container.firstChild;
    expect(wrapper.getAttribute("data-open")).toBeNull();

    const toggleButton = screen.getByRole("button", {
      name: /toggle getting started section/i,
    });
    fireEvent.click(toggleButton);

    expect(wrapper.getAttribute("data-open")).toBe("true");

    fireEvent.click(toggleButton);
    expect(wrapper.getAttribute("data-open")).toBeNull();
  });

  it("renders anchor links when anchors are provided", () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      {
        id: "basic-setup",
        title: "Basic Setup",
        title2: "Basic Setup",
        level: 2,
      },
    ];
    renderWithRouter(<SidebarItem {...defaultProps} anchors={anchors} />);
    expect(screen.getByText("Introduction")).toBeTruthy();
    expect(screen.getByText("Basic Setup")).toBeTruthy();
  });

  it("marks the active anchor and scrolls it into view", () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];

    renderWithRouter(
      <SidebarItem
        {...defaultProps}
        currentPage="/guides/getting-started"
        activeSection="setup"
        anchors={anchors}
      />,
    );

    const activeAnchor = screen.getByText("Setup").closest("a");
    expect(activeAnchor.getAttribute("aria-current")).toBe("location");
    expect(activeAnchor.className).toContain("sidebar-anchor--active");
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "nearest",
    });
  });

  it("does not scroll the sidebar when the active anchor is already visible", () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];

    const { rerender } = renderWithRouter(
      <nav>
        <div className="overflow-y-auto">
          <SidebarItem
            {...defaultProps}
            currentPage="/guides/getting-started"
            anchors={anchors}
          />
        </div>
      </nav>,
    );

    const setupAnchor = screen.getByText("Setup").closest("a");
    const scrollContainer = setupAnchor.closest(".overflow-y-auto");
    Object.defineProperty(scrollContainer, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ top: 0, bottom: 300, height: 300 }),
    });
    Object.defineProperty(setupAnchor, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ top: 100, bottom: 130, height: 30 }),
    });

    scrollIntoView.mockClear();
    rerender(
      <MemoryRouter>
        <nav>
          <div className="overflow-y-auto">
            <SidebarItem
              {...defaultProps}
              currentPage="/guides/getting-started"
              activeSection="setup"
              anchors={anchors}
            />
          </div>
        </nav>
      </MemoryRouter>,
    );

    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("does not mark duplicate anchor ids as active on non-current pages", () => {
    const anchors = [
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];

    renderWithRouter(
      <SidebarItem
        {...defaultProps}
        currentPage="/guides/asset-management"
        activeSection="setup"
        anchors={anchors}
      />,
    );

    const inactiveAnchor = screen.getByText("Setup").closest("a");
    expect(inactiveAnchor.getAttribute("aria-current")).toBeNull();
    expect(inactiveAnchor.className).not.toContain("sidebar-anchor--active");
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("updates active section immediately when an anchor is clicked", () => {
    const setActiveSection = jest.fn();
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
    ];

    renderWithRouter(
      <SidebarItem
        {...defaultProps}
        anchors={anchors}
        setActiveSection={setActiveSection}
      />,
    );

    fireEvent.click(screen.getByText("Introduction"));

    expect(setActiveSection).toHaveBeenCalledWith("intro");
  });

  it("opens the current page group when an active child anchor is inside it", () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];
    const { container, rerender } = renderWithRouter(
      <SidebarItem
        {...defaultProps}
        currentPage="/guides/getting-started"
        anchors={anchors}
      />,
    );
    const wrapper = container.firstChild;
    const toggleButton = screen.getByRole("button", {
      name: /toggle getting started section/i,
    });

    fireEvent.click(toggleButton);
    expect(wrapper.getAttribute("data-open")).toBeNull();

    rerender(
      <MemoryRouter>
        <SidebarItem
          {...defaultProps}
          currentPage="/guides/getting-started"
          activeSection="setup"
          anchors={anchors}
        />
      </MemoryRouter>,
    );

    expect(wrapper.getAttribute("data-open")).toBe("true");
  });

  it("clears the active section when the page title link is clicked", () => {
    const setActiveSection = jest.fn();

    renderWithRouter(
      <SidebarItem {...defaultProps} setActiveSection={setActiveSection} />,
    );

    fireEvent.click(screen.getByText("Getting Started"));

    expect(setActiveSection).toHaveBeenCalledWith("");
  });

  it("renders a bar icon when no anchors are provided", () => {
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} anchors={[]} />,
    );
    // No toggle button should exist when there are no anchors
    expect(screen.queryByRole("button")).toBeNull();
    // The wrapper should still render
    expect(container.firstChild).toBeTruthy();
  });

  it("matches snapshot", () => {
    const anchors = [
      { id: "step-1", title: "Step 1", title2: "Step 1", level: 2 },
    ];
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} anchors={anchors} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
