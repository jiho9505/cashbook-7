import { Account, AccountActive, Calendar, CalendarActive, Statistic, StatisticActive } from './imageUrls';

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
