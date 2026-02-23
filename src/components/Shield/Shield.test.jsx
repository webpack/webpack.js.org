// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import Shield from "./Shield.jsx";

describe("Shield", () => {
  it("renders correctly with content and label props", () => {
    const tree = renderer
      .create(<Shield content="npm/v/webpack" label="npm" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
