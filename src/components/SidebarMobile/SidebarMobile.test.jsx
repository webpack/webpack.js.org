/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidebarMobile from "./SidebarMobile.jsx";

const sections = [
  {
    title: "Guides",
    url: "/guides/",
    children: [
      { title: "Getting Started", url: "/guides/getting-started/" },
      { title: "Installation", url: "/guides/installation/" },
    ],
  },
  {
    title: "Concepts",
    url: "/concepts/",
    children: [{ title: "Entry Points", url: "/concepts/entry-points/" }],
  },
];

function renderSidebar(props = {}) {
  const toggle = props.toggle || jest.fn();
  const result = render(
    <MemoryRouter>
      <SidebarMobile
        isOpen={false}
        toggle={toggle}
        sections={sections}
        {...props}
      />
    </MemoryRouter>,
  );
  return { ...result, toggle };
}

describe("SidebarMobile", () => {
  it("renders all section titles", () => {
    renderSidebar();
    expect(screen.getByText("Guides")).toBeTruthy();
    expect(screen.getByText("Concepts")).toBeTruthy();
  });

  it("renders all page links", () => {
    renderSidebar();
    expect(screen.getByText("Getting Started")).toBeTruthy();
    expect(screen.getByText("Installation")).toBeTruthy();
    expect(screen.getByText("Entry Points")).toBeTruthy();
  });

  it("applies visible class when open", () => {
    const { container } = renderSidebar({ isOpen: true });
    const nav = container.querySelector("nav");
    expect(nav.className).toContain("sidebar-mobile--visible");
  });

  it("does not apply visible class when closed", () => {
    const { container } = renderSidebar({ isOpen: false });
    const nav = container.querySelector("nav");
    expect(nav.className).not.toContain("sidebar-mobile--visible");
  });

  it("calls toggle(false) when close button is clicked", () => {
    const toggle = jest.fn();
    renderSidebar({ toggle });
    fireEvent.click(screen.getByRole("button", { name: /close navigation/i }));
    expect(toggle).toHaveBeenCalledWith(false);
  });

  it("calls toggle(false) when a page link is clicked", () => {
    const toggle = jest.fn();
    renderSidebar({ toggle });
    fireEvent.click(screen.getByText("Getting Started"));
    expect(toggle).toHaveBeenCalledWith(false);
  });

  it("calls toggle(false) when a section link is clicked", () => {
    const toggle = jest.fn();
    renderSidebar({ toggle });
    fireEvent.click(screen.getByText("Guides"));
    expect(toggle).toHaveBeenCalledWith(false);
  });

  it("matches snapshot when closed", () => {
    const { container } = renderSidebar({ isOpen: false });
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot when open", () => {
    const { container } = renderSidebar({ isOpen: true });
    expect(container.firstChild).toMatchSnapshot();
  });
});
