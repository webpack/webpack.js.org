/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import { act, render, screen } from "@testing-library/react";
import OfflineBanner from "./OfflineBanner.jsx";

/**
 * Helper to mock navigator.onLine
 */
function setNavigatorOnLine(value) {
  Object.defineProperty(window.navigator, "onLine", {
    configurable: true,
    get: () => value,
  });
}

describe("OfflineBanner", () => {
  let originalOnLine;

  beforeEach(() => {
    // Save original descriptor
    originalOnLine = Object.getOwnPropertyDescriptor(
      window.navigator,
      "onLine",
    );
  });

  afterEach(() => {
    // Restore original descriptor
    if (originalOnLine) {
      Object.defineProperty(window.navigator, "onLine", originalOnLine);
    } else {
      delete window.navigator.onLine;
    }
  });

  it("renders nothing when online", () => {
    const { container } = render(<OfflineBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the offline banner snapshot", () => {
    const { container } = render(<OfflineBanner />);
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the offline banner when offline", () => {
    const { container } = render(<OfflineBanner />);
    act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    expect(container.firstChild).not.toBeNull();
  });

  it("shows the correct offline message text", () => {
    render(<OfflineBanner />);
    act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    expect(
      screen.getByText(
        "You are currently offline. Some features may be unavailable.",
      ),
    ).toBeTruthy();
  });

  it("has accessible role and aria-live attributes", () => {
    render(<OfflineBanner />);
    act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    const banner = screen.getByTestId("offline-banner");
    expect(banner.getAttribute("role")).toBe("status");
    expect(banner.getAttribute("aria-live")).toBe("polite");
  });

  it("shows banner when window goes offline", () => {
    const { container } = render(<OfflineBanner />);
    // Initially online — nothing rendered
    expect(container.firstChild).toBeNull();

    // Simulate going offline
    act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    expect(container.firstChild).not.toBeNull();
  });

  it("hides banner when window comes back online", () => {
    const { container } = render(<OfflineBanner />);
    // Initially offline — banner shown
    act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    expect(container.firstChild).not.toBeNull();

    // Simulate going online
    act(() => {
      setNavigatorOnLine(true);
      window.dispatchEvent(new Event("online"));
    });
    expect(container.firstChild).toBeNull();
  });
});
