export type Token = string;

export type Filter = {
  category: string;
  type: string;
  day: string;
  card: string;
};

// header
export type Path = string;
export type Image = string;
export type Direction = 'up' | 'down';

// Common
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

export type ServerHistoryData = {
  id: number;
  price: number;
  type: string;
  expenditureDay: string;
  userId: number;
  categoryId: number;
  payMethodId: number;
  historyContent: string;
  category: {
    id: number;
    name: string;
  };
  payMethod: {
    id: number;
    name: string;
  };
};

export type CalendarEssentialData = { price: number; category: string; historyContent: string };

export type CalendarData = {
  dayData: {
    [key: string]: {
      detail: CalendarEssentialData[]; //
      containCategory: string[];
      dayTotalIncome: number;
      dayTotalExpenditure: number;
    };
  };
  totalIncome: number;
  totalExpenditure: number;
};

export type CalendarModalData = {
  date: {
    year: Year;
    month: Month;
    date: Date | string;
  };
  dayData: {
    detail: CalendarEssentialData[]; //
    containCategory: string[];
    dayTotalIncome: number;
    dayTotalExpenditure: number;
  };
};
