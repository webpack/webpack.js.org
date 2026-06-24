"use strict";

describe("server side rendered page", () => {
  it("should find meta description", () => {
    cy.visit("/guides/getting-started/");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "تعلّم كيفية تجميع تطبيق JavaScript باستخدام webpack 5.",
    );
  });

  it("should find html tag with lang", () => {
    cy.visit("/");
    cy.get('html[lang="ar"][dir="rtl"]');
  });

  it("should find meta charset", () => {
    cy.visit("/");
    cy.get('meta[charset="utf-8"]');
  });

  it("should find the default meta description", () => {
    cy.visit("/");
    cy.get('head meta[name="description"]').should(
      "have.attr",
      "content",
      "webpack هو module bundler. هدفه الأساسي حزم ملفات JavaScript لاستخدامها في المتصفح، ويمكنه كذلك تحويل أي resource أو asset تقريبًا وحزمه أو تجهيزه.",
    );
  });

  it("should find title", () => {
    cy.visit("/");
    cy.title().should("eq", "webpack");

    cy.visit("/guides/getting-started/");
    cy.title().should("eq", "البدء | webpack");
  });
});
