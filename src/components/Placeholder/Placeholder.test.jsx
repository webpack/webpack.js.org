// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import { PlaceholderComponent } from "./Placeholder.jsx";

describe("PlaceholderComponent", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PlaceholderComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
