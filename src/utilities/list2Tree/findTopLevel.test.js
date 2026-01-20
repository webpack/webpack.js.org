"use strict";

const findTopLevel = require("./findTopLevel");

describe("findTopLevel", () => {
  it("should return level 1", () => {
    expect(findTopLevel([{ level: 1 }, { level: 2 }])).toBe(1);
  });

  it("should be undefined", () => {
    expect(findTopLevel([])).toBeUndefined();
  });
});
