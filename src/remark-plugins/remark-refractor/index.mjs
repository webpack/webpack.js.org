// inspired by https://github.com/montogeek/remark-refractor
/* eslint-disable import/no-unresolved */
import bash from "refractor/bash";
import coffeescript from "refractor/coffeescript";
import { refractor } from "refractor/core";
import diff from "refractor/diff";
import json from "refractor/json";
import jsx from "refractor/jsx";
import less from "refractor/less";
import markdown from "refractor/markdown";
import nginx from "refractor/nginx";
import ruby from "refractor/ruby";
import scss from "refractor/scss";
import stylus from "refractor/stylus";
import twig from "refractor/twig";
import typescript from "refractor/typescript";
import yaml from "refractor/yaml";
import { visit } from "unist-util-visit";
import jsLinksDetails from "./js-links-details.mjs";

refractor.register(bash);
refractor.register(diff);
refractor.register(yaml);
refractor.register(json);
refractor.register(typescript);
refractor.register(nginx);
refractor.register(ruby);
refractor.register(scss);
refractor.register(less);
refractor.register(jsx);
refractor.register(twig);
refractor.register(markdown);
refractor.register(coffeescript);
refractor.register(stylus);
refractor.register(jsLinksDetails);

function attacher({ include, exclude } = {}) {
  function visitor(node) {
    const { lang } = node;
    if (
      !lang ||
      (include && !include.includes(lang)) ||
      (exclude && exclude.includes(lang))
    ) {
      return;
    }
    let { data } = node;
    if (!data) {
      node.data = data = {};
    }
    try {
      data.hChildren = refractor.highlight(node.value, lang).children;
      for (const child of data.hChildren) {
        if (
          child.properties &&
          child.properties.className.includes("keyword")
        ) {
          if (child.children[1]) {
            child.properties.componentname = child.children[1].value.trim();
          }
          if (child.children[2]) {
            child.properties.url =
              child.children[2].children[0].value.replaceAll('"', "");
          }
        }
      }
    } catch (err) {
      if (refractor.registered(lang)) {
        console.warn("Prism failed to highlight:", err);
      }
    }
    data.hProperties ||= {};
    data.hProperties.className = [
      "hljs",
      ...(data.hProperties.className || []),
      `language-${lang}`,
    ];
  }

  function transformer(tree) {
    visit(tree, "code", visitor);
  }

  return transformer;
}

export default attacher;
