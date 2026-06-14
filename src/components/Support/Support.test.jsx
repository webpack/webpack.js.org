/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

import Support from "./Support.jsx";

jest.mock("./AdditionalSupporters.mjs", () => []);
jest.mock("./_supporters.json", () => [], { virtual: true });

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
    expect(screen.getByRole("heading", { name: "الداعمون" })).toBeTruthy();
  });

  it("renders a heading for latest rank", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.getByRole("heading", { name: "أحدث الرعاة" })).toBeTruthy();
  });

  it("renders maxAge days and limit in latest description", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.getByText(/آخر 21 يوماً/)).toBeTruthy();
    expect(screen.getByText(/أعلى 30/)).toBeTruthy();
  });

  it("renders no supporter images when latest data is empty", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("renders a heading for gold rank", () => {
    render(<Support rank="gold" type="total" />);
    expect(screen.getByRole("heading", { name: "رعاة Gold" })).toBeTruthy();
  });

  it("renders a heading for gold monthly rank", () => {
    render(<Support rank="gold" type="monthly" />);
    expect(
      screen.getByRole("heading", { name: "رعاة Gold الشهريون" }),
    ).toBeTruthy();
  });

  it("renders a heading for platinum rank", () => {
    render(<Support rank="platinum" type="total" />);
    expect(screen.getByRole("heading", { name: "رعاة Platinum" })).toBeTruthy();
  });

  it("renders monthly description text", () => {
    render(<Support rank="gold" type="monthly" />);
    expect(screen.getByText(/شهرياً لدعم webpack/)).toBeTruthy();
  });

  it("renders the become a sponsor link for sponsor ranks", () => {
    render(<Support rank="gold" type="total" />);
    expect(screen.getByRole("link", { name: /كن راعياً/ })).toBeTruthy();
  });

  it("renders the become a backer link for backer rank", () => {
    render(<Support rank="backer" type="total" />);
    expect(screen.getByRole("link", { name: /كن داعماً/ })).toBeTruthy();
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
