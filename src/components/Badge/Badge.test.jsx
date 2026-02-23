// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import Badge from "./Badge.jsx";

describe("Badge", () => {
  it("renders correctly with text prop", () => {
    const tree = renderer.create(<Badge text="webpack" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
