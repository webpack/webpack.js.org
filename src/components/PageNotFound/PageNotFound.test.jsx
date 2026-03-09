/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound.jsx";

describe("PageNotFound", () => {
  it("renders correctly", () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <PageNotFound />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
