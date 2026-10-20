import sharp from "sharp";

// Logos are measured on a downscaled copy; this is plenty to find margins.
const SAMPLE_SIZE = 128;
// Pixels this transparent or this close to white count as empty canvas.
const MAX_BACKGROUND_ALPHA = 16;
const MIN_BACKGROUND_CHANNEL = 235;
// Ignore trims that would only shave a sliver off the image.
const MIN_TRIM = 0.04;

const round = (value) => Math.round(value * 10000) / 10000;

function isBackground(data, offset) {
  return (
    data[offset + 3] <= MAX_BACKGROUND_ALPHA ||
    (data[offset] >= MIN_BACKGROUND_CHANNEL &&
      data[offset + 1] >= MIN_BACKGROUND_CHANNEL &&
      data[offset + 2] >= MIN_BACKGROUND_CHANNEL)
  );
}

/**
 * Finds the artwork inside a logo that sits on a white or transparent canvas.
 *
 * Returns the content box as fractions of the image (`x`, `y`, `width`,
 * `height`) plus the content's aspect ratio, or `null` when the logo has no
 * empty margin worth trimming. Logos whose corners are not empty (a solid
 * colored square, a photo) are never trimmed, so their design is not cropped.
 * @param {Uint8Array} data RGBA pixels
 * @param {number} width image width in pixels
 * @param {number} height image height in pixels
 * @returns {{x: number, y: number, width: number, height: number, aspect: number} | null} content box
 */
export function findContentBox(data, width, height) {
  const at = (column, row) => (row * width + column) * 4;
  const corners = [
    at(0, 0),
    at(width - 1, 0),
    at(0, height - 1),
    at(width - 1, height - 1),
  ];
  if (!corners.every((offset) => isBackground(data, offset))) return null;

  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      if (!isBackground(data, at(column, row))) {
        if (column < left) left = column;
        if (column > right) right = column;
        if (row < top) top = row;
        if (row > bottom) bottom = row;
      }
    }
  }
  // Blank image: nothing to frame.
  if (right < 0) return null;

  const box = {
    x: left / width,
    y: top / height,
    width: (right - left + 1) / width,
    height: (bottom - top + 1) / height,
  };
  if (1 - box.width < MIN_TRIM && 1 - box.height < MIN_TRIM) return null;

  return {
    x: round(box.x),
    y: round(box.y),
    width: round(box.width),
    height: round(box.height),
    aspect: round((right - left + 1) / (bottom - top + 1)),
  };
}

/**
 * Decodes an image and measures its content box with `findContentBox`.
 * @param {Buffer} buffer encoded image (PNG, JPEG, SVG, WebP, GIF…)
 * @returns {Promise<ReturnType<typeof findContentBox>>} content box
 */
export async function measureLogo(buffer) {
  const { data, info } = await sharp(buffer, { animated: false })
    .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Scaling with `fit: inside` keeps the aspect ratio, so the box fractions
  // and the content's aspect ratio carry over to the original image.
  return findContentBox(data, info.width, info.height);
}
