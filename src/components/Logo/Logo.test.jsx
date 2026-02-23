// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import LogoComp from "./Logo.jsx";

describe("Logo", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LogoComp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
