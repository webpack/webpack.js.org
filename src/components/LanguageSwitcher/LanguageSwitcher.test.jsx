/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

describe("LanguageSwitcher", () => {
  it("keeps the current Arabic page relative and links other languages by origin", () => {
    render(
      <LanguageSwitcher pathname="/guides/getting-started/" hash="#npm" />,
    );

    expect(screen.getByText("العربية").closest("a").href).toBe(
      "http://localhost/guides/getting-started/#npm",
    );
    expect(screen.getByText("English").closest("a").href).toBe(
      "https://webpack.js.org/guides/getting-started/#npm",
    );
    expect(screen.getByText("中文").closest("a").href).toBe(
      "https://webpack.docschina.org/guides/getting-started/#npm",
    );
    expect(screen.getByText("한국어").closest("a").href).toBe(
      "https://webpack.kr/guides/getting-started/#npm",
    );
  });
});
