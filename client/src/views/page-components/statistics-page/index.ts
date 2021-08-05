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
    expenseByDay: {
      life: [],
    },
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
          // this.render();
        }
      });
      // const fetchedData = this.fetchDatas();

      // this.setStore(fetchedData);
      // this.render();
    });
  }

  processServerDataIntoStatisticsData(data: ServerHistoryData[]) {
    const expenseByAllCategory = this.processDataIntoExpenseByAllCategory(data);
    const recentlyAccountData = this.processDataIntoRecentlyAccountData(data);
    // processDataIntoRecentlyAccountData(ㅇㅁㅅㅁ)\
    // processDataIntoExpenseBySpecificCategory
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

    return sortedHistoryData.splice(0, MAX_RECENTLY_HISTORY_DATA_AMOUNT);
  }

  fetchDatas() {
    // API Call
    const expenseByAllCategory = [
      { category: 'life', percent: 0.31 },
      { category: 'health', percent: 0.22 },
      { category: 'shopping', percent: 0.18 },
      { category: 'traffic', percent: 0.11 },
      { category: 'food', percent: 0.08 },
      { category: 'culture', percent: 0.06 },
      { category: 'etc', percent: 0.04 },
    ];
    const recentlyAccountData = dummyData.sort((p, n) => n.date - p.date).splice(0, 3);
    const expenseByLife = [
      20000, 100000, 10000, 0, 30000, 25000, 60000, 300000, 0, 3500, 600, 80000, 70000, 100000, 5000, 20000, 20000,
      20000, 100000, 10000, 0, 30000, 25000, 60000, 300000, 0, 3500, 600, 80000, 70000,
    ];
    console.log(expenseByLife.length);
    const expenseByDay = {
      life: expenseByLife,
    };

    return { expenseByAllCategory, recentlyAccountData, expenseByDay };
  }

  onClickDetailAccount(e: MouseEvent) {
    e.preventDefault();

    if (!(e.target instanceof HTMLElement)) return;
    const path = e.target.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__statistics'></div>`;
    new ExpenseByAllCategory({ parent: $('.content__statistics'), state: this.store.expenseByAllCategory });
    new RecentlyAccountHistory({ parent: $('.content__statistics'), state: this.store.recentlyAccountData });
    new ExpenseByDay({ parent: $('.content__statistics'), state: this.store.expenseByDay.life });
  }
}
