import {
  Account,
  Calendar,
  Statistic,
  CULTURE,
  ETC,
  HEALTH,
  FOOD,
  TRAFFIC,
  SHOPPING,
  LIFE,
  INCOME,
} from './image-urls';

// Usage : client/src/index.ts
export const initStoreData = {
  path: '/',
  isLoggedIn: false,
};

// Usage : client/src/index.ts
export const newStoreData = {
  path: '/account',
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  isLoggedIn: true,
};

export const PATHS = [
  ['/account', Account],
  ['/statistics', Statistic],
  ['/calendar', Calendar],
];

export const matchCategoryAndImg = {
  '문화/여가': CULTURE,
  기타: ETC,
  '의료/건강': HEALTH,
  식비: FOOD,
  교통: TRAFFIC,
  '쇼핑/뷰티': SHOPPING,
  생활: LIFE,
};

export const PICTOGRAM = {
  culture: CULTURE,
  etc: ETC,
  food: FOOD,
  health: HEALTH,
  life: LIFE,
  shopping: SHOPPING,
  traffic: TRAFFIC,
  income: INCOME,
};

export const COLORS_BY_CATEGORY = {
  culture: '#833471',
  etc: '#9980FA',
  food: '#A3CB38',
  health: '#12CBC4',
  life: '#5758BB',
  shopping: '#FFC312',
  traffic: '#006266',
  income: '#1289A7',
};

export const NAME_BY_CATEGORY = {
  culture: '문화/여가',
  etc: '기타',
  food: '식비',
  health: '의료/건강',
  life: '생활',
  shopping: '쇼핑/뷰티',
  traffic: '교통',
  income: '수입',
};
export const categoryList = ['문화/여가', '의료/건강', '식비', '교통', '생활', '쇼핑/뷰티', '기타'];

export const changeCategoryNameFromKoreanToEng = {
  '문화/여가': 'culture',
  식비: 'food',
  '의료/건강': 'health',
  생활: 'life',
  '쇼핑/뷰티': 'shopping',
  교통: 'traffic',
  기타: 'etc',
};

export const changeCategoryEnglishNameToNum = {
  culture: 0,
  food: 2,
  health: 3,
  life: 4,
  shopping: 5,
  traffic: 6,
  etc: 1,
};

export const changeCardNameFromKoreanToEng = {
  카카오뱅크: 'kakao',
  신한카드: 'shinhan',
  현금: 'money',
  우리카드: 'woori',
  롯데카드: 'lotte',
  삼성카드: 'samsung',
  현대카드: 'hyundai',
  기타: 'etc',
};

export const changeCardEnglishNameToNum = {
  shinhan: 0,
  woori: 1,
  kakao: 2,
  lotte: 3,
  hyundai: 4,
  samsung: 5,
  money: 6,
  etc: 7,
};
