import { PICTOGRAM } from '@src/static/constants';
import { AccountData } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { changeIntoDateFormat, createDOMWithSelector } from '@src/utils/helper';

import './RecentlyAccountHistory.scss';

export default class RecentlyAccountHistory {
  $RecentlyAccountHistory: HTMLElement;
  recentlyAccountHistoryList: AccountData[];

  constructor({ parent, state }) {
    this.$RecentlyAccountHistory = createDOMWithSelector('div', '.recently-account-history');
    this.recentlyAccountHistoryList = state;

    parent.appendChild(this.$RecentlyAccountHistory);
    this.render();
  }

  render() {
    this.$RecentlyAccountHistory.innerHTML = `
        <span class='recently-account-history__title'>최근 가계부 내역</span>
        <a href='/account' class='recently-account-history__detail'>자세히 보기 ></a>
        <div class='recently-account-wrap'>
          ${this.getRecentlyAccountDOM()}
        </div>
    `;
  }

  getRecentlyAccountDOM = () => {
    return this.recentlyAccountHistoryList.map((d) => this.RecentlyAccount(d)).join('');
  };

  RecentlyAccount = (data: AccountData) => {
    const splitedMoney = data.amountOfMoney.split(',');

    return `
        <div class='recently-account'>
          <img src=${PICTOGRAM[data.category]}>
              <div>
                  <span class='recently-account__title'>${data.title}</span>
                  <span class='recently-account__date'>${changeIntoDateFormat(data.date)}</span>
              </div>
              <span class='recently-account__date'>
                  ${!data.isIncome ? '-₩' : '₩'}
                  ${splitedMoney.splice(0, splitedMoney.length - 1).join(',')}<span class='hundred-won'>,${
      splitedMoney[splitedMoney.length - 1]
    }<span>
              </span>
        </div>
    `;
  };
}
