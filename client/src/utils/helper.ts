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

export const changeIntoDateFormat = (data: number) => {
  const currentDate = new Date(data);
  const m = currentDate.getMonth() + 1;
  const d = currentDate.getDate();
  const h = currentDate.getHours();
  const hh = h <= 12 ? h : h - 12;
  const mm = currentDate.getMinutes();
  return `${m}월 ${d}일, ${hh.toString().padStart(2, '0')}:${mm} ${h < 12 ? 'am' : 'pm'}`;
};
