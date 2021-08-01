import { dummyData } from '@src/dummyData';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

import './index.scss';
import RecentlyAccountHistory from './RecentlyAccountHistory/RecentlyAccountHistory';
import ExpenseByCategory from './ExpenseByCategory/ExpenseByCategory';
import ExpenseByAllCategory from './ExpenseByAllCategory/ExpenseByAllCategory';

export default class StatisticsPageView {
  store = {
    expenseByAllCategory: [],
    recentlyAccountData: [],
    expenseByCategory: {
      life: [],
    },
  };

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      const fetchedData = this.fetchDatas();
      this.setStore(fetchedData);
      this.render();
    });
  }

  setStore(nextStore) {
    this.store = { ...this.store, ...nextStore };
    // handleEvent.fire('statisticsStoreUpdated', { state: 'all' });
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
    const expenseByCategory = {
      life: expenseByLife,
    };

    return { expenseByAllCategory, recentlyAccountData, expenseByCategory };
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
    new ExpenseByCategory({ parent: $('.content__statistics'), state: this.store.expenseByCategory.life });
  }
}
