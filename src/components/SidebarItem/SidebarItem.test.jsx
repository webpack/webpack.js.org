/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidebarItem from "./SidebarItem.jsx";

const scrollIntoViewMock = jest.fn();
const requestAnimationFrameMock = (callback) => {
  callback();
  return 1;
};
const cancelAnimationFrameMock = jest.fn();

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: scrollIntoViewMock,
  });
  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: requestAnimationFrameMock,
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    configurable: true,
    value: cancelAnimationFrameMock,
  });
});

afterAll(() => {
  delete HTMLElement.prototype.scrollIntoView;
});

function renderWithRouter(ui, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("SidebarItem", () => {
  const defaultProps = {
    title: "Getting Started",
    url: "/guides/getting-started/",
    currentPage: "/guides/",
    anchors: [],
  };

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

  it("highlights and scrolls the active anchor into view", () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];

    render(
      <MemoryRouter initialEntries={["/guides/getting-started/"]}>
        <div>
          <div id="md-content">
            <h2 id="intro">Introduction</h2>
            <h2 id="setup">Setup</h2>
          </div>
          <SidebarItem {...defaultProps} anchors={anchors} currentPage="/guides/getting-started/" />
        </div>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Setup" }).className).toContain(
      "text-[#175d96]",
    );
    expect(scrollIntoViewMock).toHaveBeenCalled();
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
