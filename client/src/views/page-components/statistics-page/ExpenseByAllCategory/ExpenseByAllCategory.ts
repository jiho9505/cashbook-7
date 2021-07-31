import { createDOMWithSelector } from '@src/utils/helper';

import './ExpenseByAllCategory.scss';

export default class ExpenseByAllCategory {
  $ExpenseByAllCategory: HTMLElement;

  constructor({ parent }) {
    this.$ExpenseByAllCategory = createDOMWithSelector('div', '.expense-by-all-category');
    parent.appendChild(this.$ExpenseByAllCategory);
    this.render();
    console.log(this.getCoordinatesForPercent(0.12));
  }

  render() {
    this.$ExpenseByAllCategory.innerHTML = `
        <span class='expense-by-all-category__title'>카테고리 별 지출</span>
        <div class='expense-by-all-category__content'>
          <div class='content__chart'>
            <svg viewBox='-1.5 -1.5 3 3'>
            ${this.getDoughnutChartPath()}
            </svg>
          </div>
          <div class='content__summary'></div>
        <div>
        `;
  }

  getCoordinatesForPercent(percent: number): number[] {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);

    return [x, y];
  }

  getDoughnutChartPath() {
    const test = [
      { percent: 0.2, color: 'Coral' },
      { percent: 0.3, color: 'Black' },
      { percent: 0.2, color: 'Blue' },
      { percent: 0.15, color: 'Purple' },
    ];

    let accumulatedPercent = 0;
    const paths = test
      .map(({ percent, color }, i) => {
        const [startX, startY] = this.getCoordinatesForPercent(accumulatedPercent);
        accumulatedPercent += percent;
        const [endX, endY] = this.getCoordinatesForPercent(accumulatedPercent);

        const isLargeArcFlag = percent > 0.5 ? 1 : 0;

        const targetRad = 2 * Math.PI * percent;
        const targetRestRad = 2 * Math.PI * (1 - percent);

        return `
        <path d='M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0' fill=none stroke-dasharray='${targetRad} ${targetRestRad}' stroke-width=0.4 stroke-dashoffset=${targetRad} stroke=${color}>
          <animate attributeName='stroke-dashoffset' from=${targetRad} to='0.025' dur='0.25' begin=${
          0.25 * i
        } fill="freeze"/>
        </path>
      `;
      })
      .join('');

    return paths;
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
