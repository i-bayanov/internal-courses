export default function buildTagObjectModel(tag) {
  const tagRE = /<(?<tagName>[a-z][a-z0-9]*)\s?(?<attributes>[^>]*)>((?<innerText>[^<]*)(?=<\/\k<tagName>>))?/i;
  const tagData = tag.match(tagRE).groups;

  Object.keys(tagData).forEach((key) => {
    if (!tagData[key]) {
      delete tagData[key];
    }
  });

  const attributeRE = /(?<attribute>[a-z0-9-]+)(="(?<value>[^"]*)"|\s|$)/gi;
  const attributes = tagData.attributes ? Array.from(tagData.attributes.matchAll(attributeRE)) : [];
  delete tagData.attributes;

  attributes.forEach((elem) => {
    let { attribute, value } = elem.groups;

    if (/^class$/.test(attribute)) {
      attribute = 'classList';
      value = value.split(/\s/g);
    }

    if (/^data-.+$/.test(attribute)) {
      value = { ...tagData.dataset };
      value[hyphensToCamelCase(attribute.replace(/data-/i, ''))] = elem.groups.value;
      attribute = 'dataset';
    }

    if (/^style$/.test(attribute)) {
      value = Object.fromEntries(value.split(/;\s/g).map((el) => {
        const entry = el.split(/:\s/);

        return [hyphensToCamelCase(entry[0]), entry[1]];
      }));
    }

    tagData[attribute] = value || true;
  });

  return tagData;
}

function hyphensToCamelCase(str) {
  return str.replace(/-(\w)/g, (_match, p1) => p1.toUpperCase());
}
