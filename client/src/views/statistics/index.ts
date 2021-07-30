import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class StatisticsView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      this.render();
      $('.recently-account-history__detail').addEventListener('click', this.onClickDetailAccount);

      console.log($('.doughnut-chart'));
      [...$('.doughnut-chart').children].map((path, i) => {
        setTimeout(() => {
          path.classList.remove('hide');
        }, 2 * i);
      });
    });
  }

  render() {
    $('.content-wrap').innerHTML = `
      <div class='content__statistics'>
        ${this.ExpenseOnCategory()}
        ${this.RecentlyAccountHistory()}
        ${this.CurvedChart()}
      </div>
    `;
  }

  // Component
  ExpenseOnCategory() {
    return Container({
      tagName: 'div',
      className: 'expense-on-category',
      child: [this.ExpenseOnCategoryTitle(), this.ExpenseOnCategoryContent()],
    });
  }

  ExpenseOnCategoryTitle = () => {
    return Container({
      tagName: 'span',
      className: 'expense-on-category__title',
      child: '카테고리 별 지출',
    });
  };

  ExpenseOnCategoryContent() {
    return Container({
      tagName: 'div',
      className: 'expense-on-category__content',
      child: [this.DoughnutChart(), this.ExpenseOnCategorySort()],
    });
  }

  ExpenseOnCategorySort() {
    return Container({
      tagName: 'div',
      className: 'expense-on-category__sort',
    });
  }

  DoughnutChart = () => {
    return Container({
      tagName: 'svg',
      className: 'doughnut-chart',
      attribute: [['viewBox', '0 0 100 100']],
      child: [...Array(360).keys()] //
        .map((i) => i + 1)
        .map((degree) => this.DoughnutChartPath(degree)),
    });
  };

  DoughnutChartPath = (degree) => {
    const d = this.getArc({ x: 50, y: 50, radius: 40, degree });
    return `<path d='${d}' stroke='#5D5FEF' fill='transparent' class='hide'></path>`;
  };

  MAX_DEGREE = 359;
  getArc = (props) => {
    const startCoord = this.getCoordsOnCircle({ ...props, degree: 0 });
    const finishCoord = this.getCoordsOnCircle({ ...props });

    const { x, y, radius, degree } = props;
    const isLargeArc = degree > 180 ? 1 : 0;
    const isEnd = degree === this.MAX_DEGREE;
    // console.log(finishCoo.x, finishCoo.y);
    const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${
      finishCoord.y
    } L ${x} ${y} ${isEnd ? 'z' : ''}`;
    return d;
  };

  getCoordsOnCircle = ({ x, y, radius, degree }) => {
    const radian = (degree / 180) * Math.PI;
    return {
      x: x + radius * Math.cos(radian),
      y: y + radius * Math.sin(radian),
    };
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
}
