/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, describe, expect, it } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown.jsx";

const items = [
  { title: "English", url: "/en/", lang: "en" },
  { title: "French", url: "/fr/", lang: "fr" },
  { title: "Spanish", url: "/es/", lang: "es" },
];

function getListWrapper(container) {
  return container.querySelector("ul").closest("div").className;
}

describe("Dropdown", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the toggle button", () => {
    render(<Dropdown items={items} />);
    expect(
      screen.getByRole("button", { name: /select language/i }),
    ).toBeTruthy();
  });

  it("hides the dropdown by default", () => {
    const { container } = render(<Dropdown items={items} />);
    expect(getListWrapper(container)).toContain("hidden");
  });

  it("shows the dropdown on hover", () => {
    const { container } = render(<Dropdown items={items} />);
    const nav = container.querySelector("nav");

    fireEvent.mouseOver(nav);
    expect(getListWrapper(container)).not.toContain("hidden");
  });

  it("hides the dropdown on mouse leave", () => {
    const { container } = render(<Dropdown items={items} />);
    const nav = container.querySelector("nav");

    fireEvent.mouseOver(nav);
    fireEvent.mouseLeave(nav);
    expect(getListWrapper(container)).toContain("hidden");
  });

  it("toggles dropdown on button click", () => {
    const { container } = render(<Dropdown items={items} />);
    const button = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(button);
    expect(getListWrapper(container)).not.toContain("hidden");

    fireEvent.click(button);
    expect(getListWrapper(container)).toContain("hidden");
  });

  it("sets aria-expanded correctly", () => {
    render(<Dropdown items={items} />);
    const button = screen.getByRole("button", { name: /select language/i });

    expect(button.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders all items", () => {
    render(<Dropdown items={items} />);
    expect(screen.getByText("English")).toBeTruthy();
    expect(screen.getByText("French")).toBeTruthy();
    expect(screen.getByText("Spanish")).toBeTruthy();
  });

  it("closes on Escape key", () => {
    const { container } = render(<Dropdown items={items} />);
    const button = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(button);
    expect(getListWrapper(container)).not.toContain("hidden");

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keyup", { key: "Escape", bubbles: true }),
      );
    });

    expect(getListWrapper(container)).toContain("hidden");
  });

  it("closes when clicking outside", () => {
    const { container } = render(<Dropdown items={items} />);
    const button = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(button);
    expect(getListWrapper(container)).not.toContain("hidden");

    act(() => {
      document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(getListWrapper(container)).toContain("hidden");
  });

  it("does not close dropdown when arrow keys are pressed", () => {
    const { container } = render(<Dropdown items={items} />);
    const button = screen.getByRole("button", { name: /select language/i });
    fireEvent.click(button);

    const links = screen.getAllByRole("link");
    fireEvent.keyDown(links[0], { key: "ArrowDown" });
    expect(getListWrapper(container)).not.toContain("hidden");

    fireEvent.keyDown(links[links.length - 1], { key: "ArrowDown" });
    expect(getListWrapper(container)).not.toContain("hidden");
  });

  it("matches snapshot", () => {
    const { container } = render(<Dropdown items={items} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
