/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import { render } from "@testing-library/react";
import { PlaceholderComponent } from "./Placeholder.jsx";

describe("PlaceholderComponent", () => {
  it("renders correctly", () => {
    const { container } = render(<PlaceholderComponent />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
