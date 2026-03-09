"use strict";

const { TextDecoder, TextEncoder } = require("node:util");

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
