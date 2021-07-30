import './index.scss';
import handleEvent from '@src/utils/handleEvent';
import { $, changeIntoDateFormat, Container } from '@src/utils/helper';
import { dummyData } from '@src/dummyData';
import { AccountData } from '@src/types';
import { PICTOGRAM } from '@src/static/statistics';

export default class StatisticsView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      this.render();
      $('.recently-account-history__detail').addEventListener('click', this.onClickDetailAccount);
    });
  }
  recentlyAccountData = dummyData.sort((p, n) => n.date - p.date).splice(0, 3);

  onClickDetailAccount(e: MouseEvent) {
    e.preventDefault();

    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    const path = target.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('.content-wrap').innerHTML = `
      <div class='content__statistics'>
        ${this.DoughnutChart()}
        ${this.RecentlyAccountHistory()}
        ${this.CurvedChart()}
      </div>
    `;
  }

  // Component
  DoughnutChart() {
    return Container({
      tagName: 'div',
      className: 'doughnut-chart',
      child: [this.DoughnutChartTitle()],
    });
  }

  DoughnutChartTitle = () => {
    return Container({
      tagName: 'span',
      className: 'doughnut-chart__title',
      child: '카테고리 별 지출',
    });
  };

  RecentlyAccountHistory() {
    return Container({
      tagName: 'div',
      className: 'recently-account-history',
      child: [
        this.RecentlyAccountHistoryTitle(),
        this.AccountDetailTag(),
        [...this.recentlyAccountData.map((d) => this.RecentlyAccount(d))],
      ],
    });
  }

  RecentlyAccountHistoryTitle = () => {
    return Container({
      tagName: 'span',
      className: 'recently-account-history__title',
      child: '최근 가계부 내역',
    });
  };

  AccountDetailTag = () => {
    return `
      <a href='/account' class='recently-account-history__detail'>자세히 보기 ></a>
    `;
  };

  CurvedChart() {
    return Container({
      tagName: 'div',
      className: 'curved-chart',
      child: [this.CurvedChartTitle()],
    });
  }

  CurvedChartTitle = () => {
    return Container({
      tagName: 'span',
      className: 'curved-chart__title',
      child: '생활 카테고리 소비 추이',
    });
  };

  RecentlyAccount = (data: AccountData) => {
    const splitedMoney = data.amountOfMoney.split(',');

    return Container({
      tagName: 'div',
      className: 'recently-account',
      child: `
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
      `,
    });
  };
}
