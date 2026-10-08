/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SidebarItem from "./SidebarItem.jsx";

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

  let content;

  afterEach(() => {
    content?.remove();
    content = undefined;
  });

  function setupHeadings(positions) {
    content = document.createElement("div");
    content.id = "md-content";
    for (const [id, top] of Object.entries(positions)) {
      const heading = document.createElement("h2");
      heading.id = id;
      heading.getBoundingClientRect = () => ({ top, bottom: top + 30 });
      content.append(heading);
    }
    document.body.append(content);
  }

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

  it("renders a bar icon when no anchors are provided", () => {
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} anchors={[]} />,
    );
    // No toggle button should exist when there are no anchors
    expect(screen.queryByRole("button")).toBeNull();
    // The wrapper should still render
    expect(container.firstChild).toBeTruthy();
  });

  it("highlights the anchor of the heading currently in view", async () => {
    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
      { id: "setup", title: "Setup", title2: "Setup", level: 2 },
    ];
    setupHeadings({ intro: -50, setup: 400 });

    renderWithRouter(
      <SidebarItem
        {...defaultProps}
        currentPage="/guides/getting-started/"
        anchors={anchors}
      />,
    );

    await waitFor(() =>
      expect(
        screen.getByText("Introduction").getAttribute("data-active-anchor"),
      ).toBe("true"),
    );
    expect(
      screen.getByText("Setup").getAttribute("data-active-anchor"),
    ).toBeNull();
  });

  it("auto-scrolls the active anchor into view", async () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    const anchors = [
      { id: "intro", title: "Introduction", title2: "Introduction", level: 2 },
    ];
    setupHeadings({ intro: -50 });

    renderWithRouter(
      <SidebarItem
        {...defaultProps}
        currentPage="/guides/getting-started/"
        anchors={anchors}
      />,
    );

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    expect(scrollIntoView).toHaveBeenCalledWith({
      block: "nearest",
      behavior: "smooth",
    });

    delete Element.prototype.scrollIntoView;
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
