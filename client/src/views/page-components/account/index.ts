import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';
import { createDOMWithSelector } from '@src/utils/helper';
import '@src/views/page-components/account/index.scss';
import MyBalance from './myBalance/myBalance';
import PayMethod from '@src/views/components/payMethod/payMethod';
import History from './history/history';

export default class AccountView {
  state = {
    balance: sampleBalance,
    payMethods: samplePay,
    history: sampleHistory,
  };

  constructor() {
    const accountWrapper = createDOMWithSelector('div', '.account');

    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;

      $('.content-wrap').appendChild(accountWrapper);

      new MyBalance({ parent: accountWrapper, state: this.state.balance });
      new PayMethod({ parent: accountWrapper, state: this.state.payMethods });
      new History({ parent: accountWrapper, state: this.state.history });
    });
  }
}

const sampleBalance = '363,000원';
const samplePay = [
  { payMethodName: '카카오뱅크', payMethodMoney: '10,000원' },
  { payMethodName: '신한카드', payMethodMoney: '5,000원' },
  { payMethodName: '현금', payMethodMoney: '50,000원' },
  { payMethodName: '우리카드', payMethodMoney: '5,200원' },
  { payMethodName: '롯데카드', payMethodMoney: '3,200원' },
  { payMethodName: '삼성카드', payMethodMoney: '1,200원' },
  { payMethodName: '현대카드', payMethodMoney: '4,200원' },
  { payMethodName: 'anything', payMethodMoney: '2,200원' },
];
const sampleHistory = {
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
