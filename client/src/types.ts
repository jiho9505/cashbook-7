export interface Store {
  categories?: Category[];
}

type Category =
  | 'life' //
  | 'health'
  | 'shopping'
  | 'traffic'
  | 'food'
  | 'culture'
  | 'etc';

export type HTMLText = string;
export type Coord = number;
export type Expense = number;

export interface AccountData {
  title: string;
  date: number;
  category: Category;
  method: string;
  amountOfMoney: string;
  isIncome: boolean;
}

export interface CategoryStatisticData {
  category: string;
  percent: number;
}

export interface ArcSVGCommandAttribute {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isLargeArcFlag: number;
}

// Calendar

export type Year = number;
export type Month = number;
export type Date = number;
export type Day = number;
export type DayInfos = {
  day: Day;
  isCurrentMonthDate: false;
};

export type Offset = number;
export type TargetDateInfos = {
  year: Year;
  month: Month;
};
