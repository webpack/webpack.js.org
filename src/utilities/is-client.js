"use strict";

const isClient = globalThis !== undefined && globalThis.document !== undefined;

module.exports = isClient;
