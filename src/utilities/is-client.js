"use strict";

const isClient = globalThis !== undefined && globalThis.document !== undefined;

export default isClient;
