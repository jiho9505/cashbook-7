import './index.scss';
import handleEvent from '@src/utils/handleEvent';
import { $, Container } from '@src/utils/helper';
// import DoughnutChart from './DoughnutChart/DoughnutChart';

export default class StatisticsView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      this.render();
    });
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
      child: [this.RecentlyAccountHistoryTitle()],
    });
  }

  RecentlyAccountHistoryTitle = () => {
    return Container({
      tagName: 'span',
      className: 'recently-account-history__title',
      child: '최근 가계부 내역',
    });
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
}
