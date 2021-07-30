import { Account, AccountActive, Calendar, CalendarActive, Statistic, StatisticActive } from './imageUrls';

export const PATHS = [
  ['/account', Account, AccountActive],
  ['/statistics', Statistic, StatisticActive],
  ['/calendar', Calendar, CalendarActive],
];
