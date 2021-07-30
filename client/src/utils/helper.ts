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

export const cardType: object = {
  신한카드: 'shinhan',
  우리카드: 'woori',
  카카오뱅크: 'kakao',
  롯데카드: 'lotte',
  현대카드: 'hyundai',
  삼성카드: 'samsung',
  현금: 'money',
};

const BASE_URL = 'https://cashbook-7.s3.ap-northeast-2.amazonaws.com/';
const CULTURE = BASE_URL + 'category' + '/culture.svg';
const ETC = BASE_URL + 'category' + '/etc.svg';
const FOOD = BASE_URL + 'category' + '/food.svg';
const HEALTH = BASE_URL + 'category' + '/health.svg';
const LIFE = BASE_URL + 'category' + '/life.svg';
const SHOPPING = BASE_URL + 'category' + '/shopping.svg';
const TRAFFIC = BASE_URL + 'category' + '/traffic.svg';

export const matchCategoryAndImg = {
  문화: CULTURE,
  기타: ETC,
  '의료/건강': HEALTH,
  음식: FOOD,
  교통: TRAFFIC,
  '쇼핑/뷰티': SHOPPING,
  생활: LIFE,
};
