/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";

import { render } from "@testing-library/react";
import LogoComp from "./Logo.jsx";

describe("Logo", () => {
  it("renders correctly", () => {
    const { container } = render(<LogoComp />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
