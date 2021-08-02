import { PICTOGRAM } from '@src/static/constants';
import { AccountData } from '@src/types';
import { changeIntoDateFormat, createDOMWithSelector } from '@src/utils/helper';

import './RecentlyAccountHistory.scss';

export default class RecentlyAccountHistory {
  $recentlyAccountHistory: HTMLElement;
  recentlyAccountHistoryList: AccountData[];

  constructor({ parent, state }) {
    this.$recentlyAccountHistory = createDOMWithSelector('div', '.recently-account-history');
    this.recentlyAccountHistoryList = state;

    parent.appendChild(this.$recentlyAccountHistory);
    this.render();
  }

  render() {
    this.$recentlyAccountHistory.innerHTML = `
        <span class='recently-account-history__title'>최근 가계부 내역</span>
        <a href='/account' class='recently-account-history__detail'>자세히 보기 ></a>
        <div class='recently-account-wrap'>
          ${this.getRecentlyAccountsDOM(this.recentlyAccountHistoryList)}
        </div>
    `;
  }

  /**
   * 최근 가계부 내역에 해당하는 DOM들을 반환합니다.
   */
  getRecentlyAccountsDOM = (data: AccountData[]): string => data.map((d) => this.RecentlyAccount(d)).join('');

  /**
   * RecentlyAccount 컴포넌트입니다.
   * 추후에 components로 이동할 가능성이 있지만,
   * 협업자와의 합의가 필요하다고 생각해 해당 위치에 선언했습니다.
   */
  RecentlyAccount(data: AccountData): string {
    return `
      <div class='recently-account'>
        <img src=${PICTOGRAM[data.category]}>
          <div>
            <span class='recently-account__title'>${data.title}</span>
            <span class='recently-account__date'>${changeIntoDateFormat(data.date)}</span>
          </div>
          ${this.getFormattedMoneySpan(data.amountOfMoney, data.isIncome)}
      </div>
    `;
  }

  /**
   * 최근 가계부 내역 금액을 formatting 하고, (300000 => ₩ 300,000)
   * 해당 내용을 span 내에 넣어 반환합니다.
   */
  getFormattedMoneySpan(money: string, isIncome: boolean): string {
    const splitedMoney = money.split(',');

    return `
      <span class='recently-account__amount'>
          ${isIncome ? '₩' : '-₩'}
          ${splitedMoney.splice(0, splitedMoney.length - 1).join(',')}<span class='hundred-won'>,${
      splitedMoney[splitedMoney.length - 1]
    }<span>
      </span>
    `;
  }
}
