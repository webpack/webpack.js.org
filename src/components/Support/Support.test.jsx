/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.unstable_mockModule("./AdditionalSupporters.mjs", () => ({ default: [] }));

// `_supporters.json` resolves to the empty mock this suite wants already.
const {
  default: Support,
  gridLayout,
  logoLayout,
  packTiles,
} = await import("./Support.jsx");

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

  it("renders maxAge days and limit in latest description", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.getByText(/last 21 days/i)).toBeTruthy();
    expect(screen.getByText(/top 30/i)).toBeTruthy();
  });

  it("renders no supporter images when latest data is empty", () => {
    render(<Support rank="latest" type="total" />);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
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

  it("renders a heading for platinum rank", () => {
    render(<Support rank="platinum" type="total" />);
    expect(
      screen.getByRole("heading", { name: "Platinum Sponsors" }),
    ).toBeTruthy();
  });

  it("renders monthly description text", () => {
    render(<Support rank="gold" type="monthly" />);
    expect(screen.getByText(/pledging/i)).toBeTruthy();
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

describe("packTiles", () => {
  const isWide = (item) => item.startsWith("W");

  it("back-fills a narrow tile into the gap a wide tile leaves", () => {
    expect(packTiles(["W1", "W2", "n1"], isWide, 3)).toEqual([
      "W1",
      "n1",
      "W2",
    ]);
  });

  it("keeps the original order when everything fits", () => {
    expect(packTiles(["n1", "W1", "n2", "n3"], isWide, 3)).toEqual([
      "n1",
      "W1",
      "n2",
      "n3",
    ]);
  });

  it("does not reorder until the column count is known", () => {
    expect(packTiles(["W1", "W2", "n1"], isWide, 0)).toEqual([
      "W1",
      "W2",
      "n1",
    ]);
  });
});

describe("logoLayout", () => {
  // Where the artwork ends up inside the tile, in pixels.
  const place = (box, natural, tile) => {
    const style = logoLayout(box, natural, tile);
    const [left, top, width, height] = [
      style.left,
      style.top,
      style.width,
      style.height,
    ].map((value) => Number.parseFloat(value));
    return {
      left: left + box.x * width,
      top: top + box.y * height,
      width: box.width * width,
      height: box.height * height,
      imageAspect: width / height,
    };
  };

  const whole = { x: 0, y: 0, width: 1, height: 1 };
  // A square image whose artwork is a 2:1 band in the middle.
  const band = { x: 0.25, y: 0.375, width: 0.5, height: 0.25 };

  it("fills most of the tile with the artwork, centered", () => {
    const result = place(
      band,
      { width: 400, height: 400 },
      {
        width: 100,
        height: 100,
      },
    );
    expect(result.width).toBeCloseTo(92);
    expect(result.height).toBeCloseTo(46);
    expect(result.left).toBeCloseTo(4);
    expect(result.top).toBeCloseTo(27);
    expect(result.imageAspect).toBeCloseTo(1);
  });

  it("keeps wide artwork lighter than full height", () => {
    // A 3:1 text logo in a double-width tile is held to 55% of the tile height.
    const result = place(
      whole,
      { width: 600, height: 200 },
      { width: 200, height: 96 },
    );
    expect(result.height).toBeCloseTo(96 * 0.55);
    expect(result.width).toBeLessThanOrEqual(200 * 0.92);
  });

  it("fits very wide artwork to the width of its tile", () => {
    const result = place(
      whole,
      { width: 600, height: 100 },
      { width: 200, height: 96 },
    );
    expect(result.width).toBeCloseTo(184);
  });

  it("does not enlarge small images until they blur", () => {
    const result = place(
      whole,
      { width: 40, height: 40 },
      {
        width: 192,
        height: 192,
      },
    );
    expect(result.width).toBeCloseTo(50);
    expect(result.left).toBeCloseTo(71);
  });
});

describe("gridLayout", () => {
  const platinum = { tile: 112, maxTile: 128, gap: 16 };
  const bronze = { tile: 46, maxTile: 54, gap: 8 };

  it("fills a phone-width row without exceeding the tile size", () => {
    const { columns, tile } = gridLayout(342, bronze, { span: 50 });
    expect(columns).toBe(6);
    expect(tile).toBeLessThanOrEqual(54);
    expect(columns * tile + (columns - 1) * 8).toBeGreaterThan(342 - columns);
  });

  it("keeps tiles small on a phone held sideways", () => {
    const { tile } = gridLayout(796, platinum, {
      viewportHeight: 300,
      span: 4,
    });
    expect(tile).toBeLessThanOrEqual(300 * 0.35);
    expect(tile).toBeLessThan(platinum.tile);
  });

  it("keeps a few logos at the tile size instead of stretching them", () => {
    expect(gridLayout(960, platinum, { span: 3 })).toEqual({
      columns: 3,
      tile: 112,
    });
  });

  it("keeps larger ranks larger on a wide phone", () => {
    const gold = { tile: 84, maxTile: 96, gap: 12 };
    expect(gridLayout(382, platinum, { span: 9 }).tile).toBeGreaterThan(
      gridLayout(382, gold, { span: 9 }).tile,
    );
  });

  it("always keeps two columns for double-width tiles", () => {
    expect(gridLayout(200, platinum, { span: 1 }).columns).toBe(2);
  });
});
