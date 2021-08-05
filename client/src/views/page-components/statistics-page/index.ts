import { dummyData } from '@src/dummyData';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

import './index.scss';
import RecentlyAccountHistory from './RecentlyAccountHistory/RecentlyAccountHistory';
import ExpenseByDay from './ExpenseByDay/ExpenseByDay';
import ExpenseByAllCategory from './ExpenseByAllCategory/ExpenseByAllCategory';
import { api } from '@src/models/api';
import { ServerHistoryData } from '@src/types';

export default class StatisticsPageView {
  store = {
    expenseByAllCategory: [],
    recentlyAccountData: [],
    expenseBySpecificCategory: [],
  };

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      const { path, month, year, accessToken } = e.detail.state;
      if (path !== '/statistics') return;

      console.log(month, year, accessToken);

      const fetchCalendarDataURL = `/account-history?expenditureDay=${year}-${month.toString().padStart(2, '0')}`;

      api.get(fetchCalendarDataURL, accessToken).then((res) => {
        if (res.success) {
          // this.currentCalendarData = res.data.accountHistory;

          this.processServerDataIntoStatisticsData(res.data.accountHistory);
          this.render();
        }
      });
    });
  }

  processServerDataIntoStatisticsData(data: ServerHistoryData[]): void {
    const expenseByAllCategory = this.processDataIntoExpenseByAllCategory(data);
    const recentlyAccountData = this.processDataIntoRecentlyAccountData(data);
    const expenseBySpecificCategory = this.processDataIntoExpenseBySpecificCategory(data);

    this.store.expenseByAllCategory = expenseByAllCategory;
    this.store.recentlyAccountData = recentlyAccountData;
    this.store.expenseBySpecificCategory = expenseBySpecificCategory;
  }

  /**
   * 서버 데이터를 가져온 후
   * 해당 데이터 개수를 파악하여 percentage 를 계산합니다.
   * income 요소는 포함하지 않습니다.
   */
  processDataIntoExpenseByAllCategory(data: ServerHistoryData[]) {
    const amountByCategory: { [key: string]: number } = {};

    const onlyExpenditureData = data.filter(({ category }) => category.name !== 'income');
    onlyExpenditureData.forEach(({ category }) => {
      if (!(category.name in amountByCategory)) return (amountByCategory[category.name] = 1);
      amountByCategory[category.name]++;
    });

    const expenseByAllCategory = Object.entries(amountByCategory).map(([category, value]) => {
      return { category, percent: (value / onlyExpenditureData.length).toFixed(2) };
    });

    return expenseByAllCategory;
  }

  /**
   * 서버 데이터를 가공하여
   * 가장 최근 가계부 내역을 가져옵니다.
   * expenditureDay 순으로 sorting 후, 최상위 3가지 요소를 가져옵니다.
   */
  processDataIntoRecentlyAccountData(data: ServerHistoryData[]) {
    const MAX_RECENTLY_HISTORY_DATA_AMOUNT = 3;
    const sortedHistoryData = data.sort(
      (prev, next) => parseInt(next.expenditureDay.split('-')[2]) - parseInt(prev.expenditureDay.split('-')[2])
    );

    return sortedHistoryData.slice(0, MAX_RECENTLY_HISTORY_DATA_AMOUNT);
  }

  /**
   * 서버 데이터를 가공하여
   * 각 날짜에 지출 금액을 더해 반환합니다.
   */
  processDataIntoExpenseBySpecificCategory(data: ServerHistoryData[]) {
    const MAX_MONTH_DATE = 31;
    const expenseByLife = [...new Array(MAX_MONTH_DATE)].map((_) => 0);

    const onlyExpenditureData = data.filter(({ category }) => category.name !== 'income');
    onlyExpenditureData.forEach(({ expenditureDay, price }) => {
      const day = parseInt(expenditureDay.split('-')[2]);
      expenseByLife[day - 1] += price;
    });

    return expenseByLife;
  }

  onClickDetailAccount(e: MouseEvent) {
    e.preventDefault();

    if (!(e.target instanceof HTMLElement)) return;
    const path = e.target.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__statistics'></div>`;
    // new ExpenseByAllCategory({ parent: $('.content__statistics'), state: this.store.expenseByAllCategory });
    // new RecentlyAccountHistory({ parent: $('.content__statistics'), state: this.store.recentlyAccountData });
    new ExpenseByDay({ parent: $('.content__statistics'), state: this.store.expenseBySpecificCategory });
  }
}
