import {
  Account,
  AccountActive,
  Calendar,
  CalendarActive,
  Statistic,
  StatisticActive,
  CULTURE,
  ETC,
  HEALTH,
  FOOD,
  TRAFFIC,
  SHOPPING,
  LIFE,
} from './image-urls';

export const PATHS = [
  ['/account', Account, AccountActive],
  ['/statistics', Statistic, StatisticActive],
  ['/calendar', Calendar, CalendarActive],
];

export const cardType: object = {
  신한카드: 'shinhan',
  우리카드: 'woori',
  카카오뱅크: 'kakao',
  롯데카드: 'lotte',
  현대카드: 'hyundai',
  삼성카드: 'samsung',
  현금: 'money',
};

export const matchCategoryAndImg = {
  문화: CULTURE,
  기타: ETC,
  '의료/건강': HEALTH,
  음식: FOOD,
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
};

export const COLORS_BY_CATEGORY = {
  culture: '#833471',
  etc: '#9980FA',
  food: '#A3CB38',
  health: '#12CBC4',
  life: '#5758BB',
  shopping: '#FFC312',
  traffic: '#006266',
};

export const NAME_BY_CATEGORY = {
  culture: '문화/여가',
  etc: '기타',
  food: '식비',
  health: '의료/건강',
  life: '생활',
  shopping: '쇼핑/뷰티',
  traffic: '교통',
};
