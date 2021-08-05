import { PICTOGRAM } from '@src/static/constants';
import { AccountData, HTMLText, ServerHistoryData } from '@src/types';
import { changeIntoDateFormat, createDOMWithSelector, formatDataIntoWon } from '@src/utils/helper';

import './RecentlyAccountHistory.scss';

export default class RecentlyAccountHistory {
  $recentlyAccountHistory: HTMLElement;
  recentlyAccountHistoryList: ServerHistoryData[];

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
  getRecentlyAccountsDOM = (data: ServerHistoryData[]): HTMLText => data.map((d) => this.RecentlyAccount(d)).join('');

  /**
   * RecentlyAccount 컴포넌트입니다.
   */
  RecentlyAccount(data: ServerHistoryData): HTMLText {
    const { category, historyContent, price, type, expenditureDay } = data;
    const [year, month, date] = expenditureDay.split('-');
    return `
      <div class='recently-account'>
        <img src=${PICTOGRAM[category.name]}>
          <div>
            <span class='recently-account__title'>${historyContent}</span>
            <span class='recently-account__date'>${year}년 ${month}월 ${date}일</span>
            </div>
            ${this.getFormattedMoneySpan(price, type === 'income')}
            </div>
            `;
  }

  /**
   * 최근 가계부 내역 금액을 formatting 하고, (300000 => ₩ 300,000)
   * 해당 내용을 span 내에 넣어 반환합니다.
   */
  getFormattedMoneySpan(money: number, isIncome: boolean): HTMLText {
    return `
      <span class='recently-account__amount'>
          ${isIncome ? '' : '-'}
          ${formatDataIntoWon(money)}
      </span>
    `;
  }
}
