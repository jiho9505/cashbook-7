export const $ = (
  selector: string, //
  parentNode: HTMLElement | Document = document
): Element => {
  return parentNode.querySelector(selector);
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

export const createDOMWithSelector = (tag: string, ...selectors: string[]) => {
  const $DOM: HTMLElement = document.createElement(tag);
  selectors.forEach((selector) => {
    if (selector[0] === '#') {
      $DOM.id = selector.slice(1);
    }

    if (selector[0] === '.') {
      $DOM.classList.add(selector.slice(1));
    }
  });
  return $DOM;
};

/**
 * 카테고리와 카드 클릭시 사용된다.
 * 다른 클래스들의 active 속성을 지워주는 함수
 */
export const removeActiveAttributeOnClass = (
  currentIdx: number,
  parentElement: Document | HTMLElement,
  element: string
): void => {
  const allElement = parentElement.querySelectorAll(element);

  [...allElement].forEach((ele, idx) => {
    if (idx !== currentIdx) {
      ele.classList.remove('active');
    }
  });
};
