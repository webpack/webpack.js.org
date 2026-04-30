/**
 * @jest-environment jsdom
 */
import { act, render, screen } from "@testing-library/react";
import SmallIcon from "../../assets/icon-square-small-slack.png";

import Support from "./Support.jsx";

// Data must be inline - jest.mock is hoisted before const declarations (TDZ)
jest.mock("./AdditionalSupporters.mjs", () => []);
jest.mock(
  "./_supporters.json",
  () => {
    const NOW = Date.now();
    const DAY = 24 * 60 * 60 * 1000;
    const recent = Array.from({ length: 12 }, (_, i) => ({
      slug: `recent-${i}`,
      name: `Recent ${i}`,
      avatar: `https://example.com/recent-${i}.png`,
      totalDonations: (12 - i) * 10000,
      monthlyDonations: 0,
      firstDonation: new Date(NOW - (i + 1) * DAY).toISOString(),
    }));
    const stale = [
      {
        slug: "stale-org",
        name: "Stale Org",
        avatar: "https://example.com/stale.png",
        totalDonations: 9999999,
        monthlyDonations: 0,
        firstDonation: new Date(NOW - 30 * DAY).toISOString(),
      },
    ];
    return [...recent, ...stale];
  },
  { virtual: true },
);

describe("Support with rank='latest'", () => {
  let intersectionCallback;

  beforeEach(() => {
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
      return { observe: jest.fn(), disconnect: jest.fn() };
    });
  });

  it("renders supporters within the 14-day window, capped at the limit", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.getAllByRole("img")).toHaveLength(30);
  });

  it("excludes supporters whose firstDonation is older than 14 days", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.queryByAltText("Stale Org's avatar")).toBeNull();
  });

  it("shows SmallIcon for every supporter before intersection observer fires", () => {
    render(<Support rank="latest" type="total" />);
    const imgs = screen.getAllByRole("img");
    for (const img of imgs) {
      expect(img.getAttribute("src")).toBe(SmallIcon);
    }
  });

  it("swaps in supporter avatars after intersection observer fires", () => {
    render(<Support rank="latest" type="total" />);
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });
    const imgs = screen.getAllByRole("img");
    for (const img of imgs) {
      expect(img.getAttribute("src")).toMatch(
        /^https:\/\/example\.com\/recent-/,
      );
    }
  });
});
