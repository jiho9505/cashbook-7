import { AccountData } from './types';

export const dummyData: AccountData[] = [
  {
    title: '헬스장 1달 이용권',
    date: 1627573014609,
    category: 'life',
    method: '신한카드',
    amountOfMoney: '300,000',
    isIncome: false,
  },
  {
    title: '맥도날드 1945 버거',
    date: 1627573431618,
    category: 'food',
    method: '신한카드',
    amountOfMoney: '7,200',
    isIncome: false,
  },
  {
    title: '반팔티',
    date: 1627573014609,
    category: 'shopping',
    method: '신한카드',
    amountOfMoney: '32,100',
    isIncome: false,
  },
  {
    title: '헬스장 1달 이용권',
    date: 1627573012609,
    category: 'life',
    method: '신한카드',
    amountOfMoney: '300,000',
    isIncome: false,
  },
  {
    title: '맥도날드 1945 버거',
    date: 1627573011609,
    category: 'food',
    method: '신한카드',
    amountOfMoney: '7,200',
    isIncome: false,
  },
  {
    title: '반팔티',
    date: 1627573010609,
    category: 'shopping',
    method: '신한카드',
    amountOfMoney: '32,100',
    isIncome: false,
  },
];

export const sampleBalance = '363,000원';

export const samplePay = [
  { payMethodName: '카카오뱅크', payMethodMoney: '10,000원' },
  { payMethodName: '신한카드', payMethodMoney: '5,000원' },
  { payMethodName: '현금', payMethodMoney: '50,000원' },
  { payMethodName: '우리카드', payMethodMoney: '5,200원' },
  { payMethodName: '롯데카드', payMethodMoney: '3,200원' },
  { payMethodName: '삼성카드', payMethodMoney: '1,200원' },
  { payMethodName: '현대카드', payMethodMoney: '4,200원' },
  { payMethodName: 'anything', payMethodMoney: '2,200원' },
];

export const sampleHistory = {
  income: '1,822,470원',
  expenditure: '9,500원',
  detail: [
    {
      price: '-₩ 300,000',
      createdAt: '7월 28일, 11:48 am',
      category: '생활',
      payMethod: '신한카드',
      content: '헬스장 1달 이용권',
    },
    {
      price: '-₩ 300,000',
      createdAt: '7월 28일, 11:48 am',
      category: '의료/건강',
      payMethod: '신한카드',
      content: '도수치료',
    },
    {
      price: '-₩ 300,000',
      createdAt: '7월 28일, 11:48 am',
      category: '교통',
      payMethod: '신한카드',
      content: '지하철',
    },
  ],
};
