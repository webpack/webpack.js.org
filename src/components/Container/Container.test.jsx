/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import { render } from "@testing-library/react";
import Container from "./Container.jsx";

describe("Container", () => {
  it("renders correctly with children and className", () => {
    const { container } = render(
      <Container className="test-class">
        <p>Child content</p>
      </Container>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly without className", () => {
    const { container } = render(
      <Container>
        <span>Simple child</span>
      </Container>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
