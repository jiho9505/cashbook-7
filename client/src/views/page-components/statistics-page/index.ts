import { dummyData } from '@src/dummyData';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

import './index.scss';
import RecentlyAccountHistory from './RecentlyAccountHistory/RecentlyAccountHistory';
import ExpenseByCategory from './ExpenseByCategory/ExpenseByCategory';
import ExpenseByAllCategory from './ExpenseByAllCategory/ExpenseByAllCategory';

export default class StatisticsPageView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      this.render();
    });
  }
  recentlyAccountData = dummyData.sort((p, n) => n.date - p.date).splice(0, 3);

  onClickDetailAccount(e: MouseEvent) {
    e.preventDefault();

    if (!(e.target instanceof HTMLElement)) return;
    const path = e.target.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__statistics'></div>`;
    new ExpenseByAllCategory({ parent: $('.content__statistics') });
    new RecentlyAccountHistory({ parent: $('.content__statistics'), state: this.recentlyAccountData });
    new ExpenseByCategory({ parent: $('.content__statistics') });
  }
}
