// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import PageNotFound from "./PageNotFound.jsx";

describe("PageNotFound", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <HelmetProvider>
          <MemoryRouter>
            <PageNotFound />
          </MemoryRouter>
        </HelmetProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
