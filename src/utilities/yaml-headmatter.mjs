export default function yamlHeadmatter(fields) {
  let ret = '---\n';

  Object.keys(fields).map((field) => {
    ret += `${field}: ${fields[field]}\n`;
  });

  ret = `${ret}---\n`;

  return ret;
};
