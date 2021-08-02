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
