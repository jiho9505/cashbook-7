import { Date } from '@src/types';

export const monthText = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

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
  return `${m}월 ${d}일, ${formatDateAsTwoLetters(hh)}:${mm} ${h < 12 ? 'am' : 'pm'}`;
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

export const setValueOnLocalStorage = (key: string, value: string) => {
  let val = JSON.stringify(value);
  localStorage.setItem(key, val);
};

export const getValueOnLocalStorage = (key: string) => {
  let val = localStorage.getItem(key);
  return JSON.parse(val);
};

export const removeValueOnLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const formatDataIntoWon = (data: number) => {
  return new Intl.NumberFormat('kr-KR', { style: 'currency', currency: 'KRW' }).format(data);
};

export const formatDateAsTwoLetters = (date: Date | number) => {
  return date.toString().padStart(2, '0');
};
