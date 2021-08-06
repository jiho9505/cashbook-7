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
  수입: INCOME,
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
export const categoryList = ['문화/여가', '기타', '식비', '의료/건강', '생활', '쇼핑/뷰티', '교통', '수입'];
export const payMethodNameList = [
  '신한카드',
  '우리카드',
  '카카오뱅크',
  '롯데카드',
  '현대카드',
  '삼성카드',
  '현금',
  '기타',
];

export const initHistoryData = {
  income: '',
  expenditure: '',
  detail: [
    {
      id: '',
      price: '',
      createdAt: '',
      category: '',
      payMethod: '',
      content: '',
    },
  ],
};

export const initFilterData = {
  category: 0,
  type: '',
  day: '',
  card: 0,
};

/**
 * ----------------------------------------------------
 * 여기부터는 내역 페이지에서 데이터를 가공하는데 필요한 obj 들 입니다.
 */

export const objToChangeCategoryNameFromKoreanToEng = {
  '문화/여가': 'culture',
  식비: 'food',
  '의료/건강': 'health',
  생활: 'life',
  '쇼핑/뷰티': 'shopping',
  교통: 'traffic',
  기타: 'etc',
  수입: 'income',
};

export const objToChangeCategoryEnglishNameToNum = {
  culture: 0,
  food: 2,
  health: 3,
  life: 4,
  shopping: 5,
  traffic: 6,
  etc: 1,
  income: 7,
};

export const objToChangeCardNameFromKoreanToEng = {
  카카오뱅크: 'kakao',
  신한카드: 'shinhan',
  현금: 'money',
  우리카드: 'woori',
  롯데카드: 'lotte',
  삼성카드: 'samsung',
  현대카드: 'hyundai',
  기타: 'etc',
};

export const objToChangeCardEnglishNameToNum = {
  shinhan: 0,
  woori: 1,
  kakao: 2,
  lotte: 3,
  hyundai: 4,
  samsung: 5,
  money: 6,
  etc: 7,
};

export const CardsForModal = [
  { payMethodName: '신한카드', payMethodMoney: '' },
  { payMethodName: '우리카드', payMethodMoney: '' },
  { payMethodName: '카카오뱅크', payMethodMoney: '' },
  { payMethodName: '롯데카드', payMethodMoney: '' },
  { payMethodName: '현대카드', payMethodMoney: '' },
  { payMethodName: '삼성카드', payMethodMoney: '' },
  { payMethodName: '현금', payMethodMoney: '' },
  { payMethodName: '기타', payMethodMoney: '' },
];
