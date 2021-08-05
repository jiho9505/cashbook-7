import PayMethods from '@src/views/components/PayMethods/PayMethods';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';
import { sampleHistory } from '@src/dummyData';
import { api } from '@src/models/api';

import './index.scss';

import AccountHistory from './AccountHistory/AccountHistory';
import Balance from './Balance/Balance';
import { payMethodNameList } from '@src/static/constants';

export default class AccountView {
  state = {
    balance: '',
    payMethods: [],
    accountHistory: sampleHistory,
    filter: {
      category: '',
      type: '',
      day: '',
      card: '',
    },
  };

  constructor() {
    handleEvent.subscribe('storeupdated', async (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;

      await this.setProperty(e);

      const accountWrapper = createDOMWithSelector('div', '.account');
      $('.content-wrap').innerHTML = '';
      $('.content-wrap').appendChild(accountWrapper);

      new Balance({ parent: accountWrapper, state: this.state.balance });
      new PayMethods({ parent: accountWrapper, state: this.state.payMethods, filter: this.state.filter });
      new AccountHistory({ parent: accountWrapper, state: this.state.accountHistory, filter: this.state.filter });
    });
  }

  async setProperty(e) {
    const accessToken = e.detail.state.accessToken;
    const datas = await api.get('/account-history', accessToken);
    if (datas.success) {
      const accountDatas = datas.data.accountHistory;
      this.makeBalance(accountDatas);
      this.makePayMethodInfo(accountDatas);
      this.makeAccountHistoryInfo(accountDatas);
    } else {
      alert(datas.message);
      return;
    }
    e.detail.filter ? (this.state.filter = e.detail.filter) : '';
    console.log('fliter', this.state.filter);
  }

  /**
   * 나의 이번달 총 잔고를 얻는 함수입니다.
   */
  makeBalance(accountDatas) {
    let balance: number = 0;

    balance += this.getTotalPriceByType(accountDatas);
    const balanceString: string = balance.toString();
    const sign = balanceString[0];
    const balanceWithoutSign: string = balanceString.slice(1);

    const formattedBalance = this.formatPrice(balanceWithoutSign, sign);
    this.state.balance = formattedBalance;
  }

  /**
   * Type에 따라 sign을 반영해 총 price를 반환합니다.
   */
  getTotalPriceByType(accountDatas) {
    let price = 0;
    accountDatas.forEach((data) => {
      if (data.type === 'income') price += data.price;
      else if (data.type === 'expenditure') price -= data.price;
    });
    return price;
  }

  /**
   * 순수 숫자로 받아온 price를
   * 1. 부호(-,+) 붙혀준다.
   * 2. 세자리 단위로 , 를 붙혀준다.
   * 3. 마지막으로 '원' 을 붙혀준다.
   */
  formatPrice(priceWithoutSign, sign) {
    const moneyArray = priceWithoutSign.split('');
    const moneyLength = priceWithoutSign.length;

    if (moneyLength > 3) {
      let count = 1;
      for (let i = moneyLength - 1; i > 0; i--) {
        if (count % 3 === 0) {
          moneyArray.splice(i, 0, ',');
        }
        count++;
      }
    }

    const result = moneyArray.join('');
    return sign + result + '원';
  }

  makePayMethodInfo(accountDatas) {
    const keyIsPayMethodIdAndValueIsTotalPrice = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };
    accountDatas.forEach((data) => {
      if (data.type === 'income') keyIsPayMethodIdAndValueIsTotalPrice[data.payMethodId] += data.price;
      else if (data.type === 'expenditure') keyIsPayMethodIdAndValueIsTotalPrice[data.payMethodId] -= data.price;
    });
    this.setFormattedPriceOfEachPayMethodId(keyIsPayMethodIdAndValueIsTotalPrice);

    let priceEveryCard = [];

    console.log(payMethodNameList);
    for (let key in keyIsPayMethodIdAndValueIsTotalPrice) {
      priceEveryCard.push(keyIsPayMethodIdAndValueIsTotalPrice[key]);
    }
    console.log(priceEveryCard);

    let array = [];
    payMethodNameList.forEach((payMethodName, idx) => {
      array.push({ payMethodName, payMethodMoney: priceEveryCard[idx] });
    });

    this.state.payMethods = array;
  }

  /**
   * 순수 숫자 price를 -30,000원 이런 식으로
   * 포맷팅을 해줍니다.
   */
  setFormattedPriceOfEachPayMethodId(keyIsPayMethodIdAndValueIsTotalPrice) {
    for (let key in keyIsPayMethodIdAndValueIsTotalPrice) {
      const price: string = keyIsPayMethodIdAndValueIsTotalPrice[key].toString();
      if (price[0] === '-') keyIsPayMethodIdAndValueIsTotalPrice[key] = this.formatPrice(price.slice(1), '-');
      else keyIsPayMethodIdAndValueIsTotalPrice[key] = this.formatPrice(price, '');
    }
  }

  makeAccountHistoryInfo(accountDatas) {}
}
