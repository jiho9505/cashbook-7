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

export interface AccountData {
  title: string;
  date: number;
  category: Category;
  method: string;
  amountOfMoney: string;
  isIncome: boolean;
}
