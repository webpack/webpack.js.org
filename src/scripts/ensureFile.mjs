import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve();
const filePath = path.join(ROOT, "/_supporters.json");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  console.log("_supporters.json created");
} else {
  console.log("_supporters.json already exists");
}