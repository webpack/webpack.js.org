/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SmallIcon from "../../assets/icon-square-small-slack.png";

// Data must be inline - jest.mock is hoisted before const declarations (TDZ)
jest.mock("./AdditionalSupporters.mjs", () => []);
jest.mock(
  "./_supporters.json",
  () => [
    {
      slug: "gold-org",
      name: "Gold Org",
      totalDonations: 2000000, // $20,000 - gold range ($10k-$50k)
      monthlyDonations: 100000,
      avatar: "https://example.com/avatar.png",
      firstDonation: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ],
  { virtual: true },
);

// eslint-disable-next-line import/first
import Support from "./Support.jsx";

const AVATAR_URL = "https://example.com/avatar.png";

describe("Support with supporter data", () => {
  let intersectionCallback;
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
    jest.spyOn(window, "IntersectionObserver").mockImplementation((cb) => {
      intersectionCallback = cb;
      return { observe: mockObserve, disconnect: mockDisconnect };
    });
  });

  it("renders supporter links", () => {
    render(<Support rank="gold" type="total" />);
    // supporter link + become a sponsor link
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(2);
  });

  it("shows SmallIcon before intersection observer fires", () => {
    render(<Support rank="gold" type="total" />);
    const imgs = screen.getAllByRole("img");
    expect(imgs[0].getAttribute("src")).toBe(SmallIcon);
  });

  it("shows avatar src after intersection observer fires", () => {
    render(<Support rank="gold" type="total" />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    const imgs = screen.getAllByRole("img");
    expect(imgs[0].getAttribute("src")).toBe(AVATAR_URL);
  });

  it("falls back to SmallIcon on image error", () => {
    render(<Support rank="gold" type="total" />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    const imgs = screen.getAllByRole("img");
    fireEvent.error(imgs[0]);
    expect(imgs[0].getAttribute("src")).toBe(SmallIcon);
  });

  it("does not replace src if image already shows SmallIcon on error", () => {
    render(<Support rank="gold" type="total" />);
    // inView is false so src is already SmallIcon - error should not loop
    const imgs = screen.getAllByRole("img");
    fireEvent.error(imgs[0]);
    expect(imgs[0].getAttribute("src")).toBe(SmallIcon);
  });

  it("matches snapshot with supporter data", () => {
    const { container } = render(<Support rank="gold" type="total" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
