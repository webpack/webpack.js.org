/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import { render } from "@testing-library/react";
import Shield from "./Shield.jsx";

describe("Shield", () => {
  it("renders correctly with content and label props", () => {
    const { container } = render(
      <Shield content="npm/v/webpack" label="npm" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
