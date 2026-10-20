// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import sharp from "sharp";
import { findContentBox, measureLogo } from "./logo-box.mjs";

// A `width`×`height` PNG on `background` with a red block at `block`.
function logo({ width, height, background, block }) {
  return sharp({
    create: { width, height, channels: 4, background },
  })
    .composite([
      {
        input: {
          create: {
            width: block.width,
            height: block.height,
            channels: 4,
            background: "#c00",
          },
        },
        left: block.left,
        top: block.top,
      },
    ])
    .png()
    .toBuffer();
}

describe("measureLogo", () => {
  it("frames a small mark on a white canvas", async () => {
    const box = await measureLogo(
      await logo({
        width: 400,
        height: 400,
        background: "#fff",
        block: { left: 100, top: 150, width: 200, height: 100 },
      }),
    );
    expect(box).toEqual({
      x: 0.25,
      y: 0.375,
      width: 0.5,
      height: 0.25,
      aspect: 2,
    });
  });

  it("frames a mark on a transparent canvas", async () => {
    const box = await measureLogo(
      await logo({
        width: 200,
        height: 100,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        block: { left: 50, top: 25, width: 100, height: 50 },
      }),
    );
    expect(box).toMatchObject({ x: 0.25, y: 0.25, width: 0.5, height: 0.5 });
  });

  it("leaves solid colored logos alone", async () => {
    const box = await measureLogo(
      await logo({
        width: 200,
        height: 200,
        background: "#123456",
        block: { left: 50, top: 50, width: 100, height: 100 },
      }),
    );
    expect(box).toBeNull();
  });

  it("leaves logos that already fill their canvas alone", async () => {
    const box = await measureLogo(
      await logo({
        width: 200,
        height: 200,
        background: "#fff",
        block: { left: 2, top: 2, width: 196, height: 196 },
      }),
    );
    expect(box).toBeNull();
  });
});

describe("findContentBox", () => {
  it("returns null for a blank image", () => {
    const data = new Uint8Array(4 * 4 * 4).fill(255);
    expect(findContentBox(data, 4, 4)).toBeNull();
  });
});
