/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import { render } from "@testing-library/react";
import Badge from "./Badge.jsx";

describe("Badge", () => {
  it("renders correctly with text prop", () => {
    const { container } = render(<Badge text="webpack" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
