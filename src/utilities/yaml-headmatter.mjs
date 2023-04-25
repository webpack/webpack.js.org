export default function yamlHeadmatter(fields) {
  let ret = '---\n';

  Object.keys(fields).map((field) => {
    if (field === 'contributors') {
      if(fields[field].length) {
        ret += `${field}:\n`;
        fields[field].forEach((contributor) => {
            ret += `  - ${contributor}\n`;
        });
      }
    } else {
      ret += `${field}: ${fields[field]}\n`;
    }
  });

  ret = `${ret}---\n`;

  return ret;
};
