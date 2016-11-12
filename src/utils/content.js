export function contentFilter(content) {
  const div = document.createElement('div');
  div.innerHTML = content;
  const elements = div.getElementsByTagName('*');
  const validTag = ['id', 'class', 'src', 'alt', 'href'];
  for (const elem of elements) {
    for (let i = 0; i < elem.attributes.length;) {
      if (validTag.includes(elem.attributes[i].name)) {
        i += 1;
      } else {
        elem.removeAttribute(elem.attributes[i].name);
      }
    }
  }
  return div.innerHTML;
}
