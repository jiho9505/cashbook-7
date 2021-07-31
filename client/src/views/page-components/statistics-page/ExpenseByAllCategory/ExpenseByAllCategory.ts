import { createDOMWithSelector } from '@src/utils/helper';

import './ExpenseByAllCategory.scss';

export default class ExpenseByAllCategory {
  $ExpenseByAllCategory: HTMLElement;

  constructor({ parent }) {
    this.$ExpenseByAllCategory = createDOMWithSelector('div', '.expense-by-all-category');
    parent.appendChild(this.$ExpenseByAllCategory);
    this.render();
  }

  render() {
    this.$ExpenseByAllCategory.innerHTML = `
        <span class='expense-by-all-category__title'>카테고리 별 지출</span>
        <div class='expense-by-all-category__content'></div>
        <div class='expense-by-all-category__sort'></div>
    `;
  }
}

// DoughnutChart = () => {
//   return Container({
//     tagName: 'svg',
//     className: 'doughnut-chart',
//     attribute: [['viewBox', '0 0 100 100']],
//     child: [...Array(360).keys()] //
//       .map((i) => i + 1)
//       .map((degree) => this.DoughnutChartPath(degree)),
//   });
// };

// DoughnutChartPath = (degree) => {
//   const d = this.getArc({ x: 50, y: 50, radius: 40, degree });
//   return `<path d='${d}' stroke='#5D5FEF' fill='transparent' class='hide'></path>`;
// };

// MAX_DEGREE = 359;
// getArc = (props) => {
//   const startCoord = this.getCoordsOnCircle({ ...props, degree: 0 });
//   const finishCoord = this.getCoordsOnCircle({ ...props });

//   const { x, y, radius, degree } = props;
//   const isLargeArc = degree > 180 ? 1 : 0;
//   const isEnd = degree === this.MAX_DEGREE;
//   const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${
//     finishCoord.y
//   } L ${x} ${y} ${isEnd ? 'z' : ''}`;
//   return d;
// };

// getCoordsOnCircle = ({ x, y, radius, degree }) => {
//   const radian = (degree / 180) * Math.PI;
//   return {
//     x: x + radius * Math.cos(radian),
//     y: y + radius * Math.sin(radian),
//   };
// };
