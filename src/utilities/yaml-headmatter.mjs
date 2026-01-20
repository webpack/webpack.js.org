export default function yamlHeadmatter(fields) {
  let ret = "---\n";

  for (const field of Object.keys(fields)) {
    if (field === "contributors") {
      if (fields[field].length) {
        ret += `${field}:\n`;
        for (const contributor of fields[field]) {
          ret += `  - ${contributor}\n`;
        }
      }
    } else {
      ret += `${field}: ${fields[field]}\n`;
    }
  }

  ret = `${ret}---\n`;

  return ret;
}
