/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("./AdditionalSupporters.mjs", () => []);
jest.mock("./_supporters.json", () => [], { virtual: true });

// eslint-disable-next-line import/first
import Support from "./Support.jsx";

describe("Support", () => {
  let mockObserve;
  let mockDisconnect;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: class {
        observe() {}

        disconnect() {}
      },
    });
    jest.spyOn(window, "IntersectionObserver").mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }));
  });

  it("renders a heading for backer rank", () => {
    render(<Support rank="backer" type="total" />);
    expect(screen.getByRole("heading", { name: "Backers" })).toBeTruthy();
  });

  it("renders a heading for latest rank", () => {
    render(<Support rank="latest" type="total" />);
    expect(
      screen.getByRole("heading", { name: "Latest Sponsors" }),
    ).toBeTruthy();
  });

  it("renders a heading for gold rank", () => {
    render(<Support rank="gold" type="total" />);
    expect(screen.getByRole("heading", { name: "Gold Sponsors" })).toBeTruthy();
  });

  it("renders a heading for gold monthly rank", () => {
    render(<Support rank="gold" type="monthly" />);
    expect(
      screen.getByRole("heading", { name: "Gold Monthly Sponsors" }),
    ).toBeTruthy();
  });

  it("renders the become a sponsor link for sponsor ranks", () => {
    render(<Support rank="gold" type="total" />);
    expect(
      screen.getByRole("link", { name: /become a sponsor/i }),
    ).toBeTruthy();
  });

  it("renders the become a backer link for backer rank", () => {
    render(<Support rank="backer" type="total" />);
    expect(screen.getByRole("link", { name: /become a backer/i })).toBeTruthy();
  });

  it("sets up IntersectionObserver on mount", () => {
    render(<Support rank="gold" type="total" />);
    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalled();
  });

  it("disconnects IntersectionObserver on unmount", () => {
    const { unmount } = render(<Support rank="gold" type="total" />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("matches snapshot for backer rank", () => {
    const { container } = render(<Support rank="backer" type="total" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
