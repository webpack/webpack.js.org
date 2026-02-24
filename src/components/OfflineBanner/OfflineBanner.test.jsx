/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
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
    setNavigatorOnLine(true);
    const tree = renderer.create(<OfflineBanner />).toJSON();
    expect(tree).toBeNull();
  });

  it("renders the offline banner when offline", () => {
    setNavigatorOnLine(false);
    const tree = renderer.create(<OfflineBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows the correct offline message text", () => {
    setNavigatorOnLine(false);
    const { root } = renderer.create(<OfflineBanner />);
    const textEl = root.findByProps({ className: "offline-banner__text" });
    expect(textEl.children).toContain(
      "You are currently offline. Some features may be unavailable.",
    );
  });

  it("has accessible role and aria-live attributes", () => {
    setNavigatorOnLine(false);
    const { root } = renderer.create(<OfflineBanner />);
    const banner = root.findByProps({ "data-testid": "offline-banner" });
    expect(banner.props.role).toBe("status");
    expect(banner.props["aria-live"]).toBe("polite");
  });

  it("shows banner when window goes offline", () => {
    setNavigatorOnLine(true);
    let component;
    renderer.act(() => {
      component = renderer.create(<OfflineBanner />);
    });
    // Initially online — nothing rendered
    expect(component.toJSON()).toBeNull();

    // Simulate going offline
    renderer.act(() => {
      setNavigatorOnLine(false);
      window.dispatchEvent(new Event("offline"));
    });
    expect(component.toJSON()).not.toBeNull();
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("hides banner when window comes back online", () => {
    setNavigatorOnLine(false);
    let component;
    renderer.act(() => {
      component = renderer.create(<OfflineBanner />);
    });
    // Initially offline — banner shown
    expect(component.toJSON()).not.toBeNull();

    // Simulate going online
    renderer.act(() => {
      setNavigatorOnLine(true);
      window.dispatchEvent(new Event("online"));
    });
    expect(component.toJSON()).toBeNull();
  });
});
