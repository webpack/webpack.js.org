/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("matches snapshot", () => {
    const anchors = [
      { id: "step-1", title: "Step 1", title2: "Step 1", level: 2 },
    ];
    const { container } = renderWithRouter(
      <SidebarItem {...defaultProps} anchors={anchors} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("anchor links focus management", () => {
    it("focuses target heading and adds tabindex=-1 when clicked", () => {
      jest.useFakeTimers();
      const heading = document.createElement("h2");
      heading.id = "installation";
      heading.textContent = "Installation";
      document.body.appendChild(heading);

      const anchors = [
        {
          id: "installation",
          title: "Installation",
          title2: "Installation",
          level: 2,
        },
      ];

      renderWithRouter(
        <SidebarItem
          {...defaultProps}
          anchors={anchors}
          currentPage="/guides/getting-started"
        />,
        { route: "/guides/getting-started" },
      );

      const link = screen.getByRole("link", { name: "Installation" });
      expect(heading.getAttribute("tabindex")).toBeNull();

      fireEvent.click(link);

      expect(heading.getAttribute("tabindex")).toBe("-1");

      jest.advanceTimersByTime(100);
      expect(document.activeElement).toBe(heading);

      heading.remove();
      jest.useRealTimers();
    });

    it("focuses parent heading when anchor id is on an inner span", () => {
      jest.useFakeTimers();
      const heading = document.createElement("h3");
      const span = document.createElement("span");
      span.id = "inner-anchor";
      heading.appendChild(span);
      document.body.appendChild(heading);

      const anchors = [
        {
          id: "inner-anchor",
          title: "Inner Anchor",
          title2: "Inner Anchor",
          level: 3,
        },
      ];

      renderWithRouter(
        <SidebarItem
          {...defaultProps}
          anchors={anchors}
          currentPage="/guides/getting-started"
        />,
        { route: "/guides/getting-started" },
      );

      const link = screen.getByText("Inner Anchor");
      fireEvent.click(link);

      expect(heading.getAttribute("tabindex")).toBe("-1");

      jest.advanceTimersByTime(100);
      expect(document.activeElement).toBe(heading);

      heading.remove();
      jest.useRealTimers();
    });

    it("does not move focus when modifier keys are pressed", () => {
      jest.useFakeTimers();
      const heading = document.createElement("h2");
      heading.id = "modifier-test";
      document.body.appendChild(heading);

      const anchors = [
        {
          id: "modifier-test",
          title: "Modifier Test",
          title2: "Modifier Test",
          level: 2,
        },
      ];

      renderWithRouter(
        <SidebarItem
          {...defaultProps}
          anchors={anchors}
          currentPage="/guides/getting-started"
        />,
        { route: "/guides/getting-started" },
      );

      const link = screen.getByText("Modifier Test");
      fireEvent.click(link, { metaKey: true });

      jest.advanceTimersByTime(100);
      expect(heading.getAttribute("tabindex")).toBeNull();
      expect(document.activeElement).not.toBe(heading);

      heading.remove();
      jest.useRealTimers();
    });

    it("handles click gracefully when target element does not exist", () => {
      const anchors = [
        {
          id: "non-existent",
          title: "Non Existent",
          title2: "Non Existent",
          level: 2,
        },
      ];

      renderWithRouter(
        <SidebarItem
          {...defaultProps}
          anchors={anchors}
          currentPage="/guides/getting-started"
        />,
        { route: "/guides/getting-started" },
      );

      const link = screen.getByText("Non Existent");
      expect(() => fireEvent.click(link)).not.toThrow();
    });

    it("scrolls into view if already on the same hash", () => {
      jest.useFakeTimers();
      const heading = document.createElement("h2");
      heading.id = "same-hash";
      heading.scrollIntoView = () => {};
      const scrollIntoViewSpy = jest.spyOn(heading, "scrollIntoView");
      document.body.appendChild(heading);

      window.location.hash = "#same-hash";

      const anchors = [
        {
          id: "same-hash",
          title: "Same Hash",
          title2: "Same Hash",
          level: 2,
        },
      ];

      renderWithRouter(
        <SidebarItem
          {...defaultProps}
          anchors={anchors}
          currentPage="/guides/getting-started"
        />,
        { route: "/guides/getting-started/#same-hash" },
      );

      const link = screen.getByText("Same Hash");
      fireEvent.click(link);

      expect(scrollIntoViewSpy).toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(document.activeElement).toBe(heading);

      window.location.hash = "";
      heading.remove();
      jest.useRealTimers();
    });
  });
});
