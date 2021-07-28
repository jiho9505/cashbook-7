export interface Category {
  id: number;
  name: string;
  type: string;
}

export interface Store {
  categories?: Category[];
}
