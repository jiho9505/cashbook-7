export const $ = (
  selector: string, //
  parentNode: HTMLElement | Document = document
): Element => {
  return parentNode.querySelector(selector);
};

export const Container = ({
  tagName = 'div', //
  id = undefined,
  className = undefined,
  child = undefined,
}) => {
  const Node = document.createElement(tagName);
  if (id) Node.setAttribute('id', id);
  if (className) Node.setAttribute('class', className);
  Node.innerHTML = getChildHTML(child);

  return Node.outerHTML;
};

const getChildHTML = (child: string | string[]) => {
  if (!child) return '';
  if (!Array.isArray(child)) return child;

  return child.reduce((acc, curr) => acc + getChildHTML(curr), '');
};
