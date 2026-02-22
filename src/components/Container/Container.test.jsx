// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import Container from "./Container.jsx";

describe("Container", () => {
  it("renders correctly with children and className", () => {
    const tree = renderer
      .create(
        <Container className="test-class">
          <p>Child content</p>
        </Container>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without className", () => {
    const tree = renderer
      .create(
        <Container>
          <span>Simple child</span>
        </Container>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
