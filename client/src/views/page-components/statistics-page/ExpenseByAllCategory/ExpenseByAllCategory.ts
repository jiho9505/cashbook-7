import { COLORS_BY_CATEGORY } from '@src/static/constants';
import { CategoryStatisticData } from '@src/types';
import { createDOMWithSelector } from '@src/utils/helper';

import './ExpenseByAllCategory.scss';

export default class ExpenseByAllCategory {
  $ExpenseByAllCategory: HTMLElement;
  $CategoryStatisticData: CategoryStatisticData[];

  constructor({ parent, state }) {
    this.$ExpenseByAllCategory = createDOMWithSelector('div', '.expense-by-all-category');
    this.$CategoryStatisticData = state;

    parent.appendChild(this.$ExpenseByAllCategory);
    this.render();
  }

  render() {
    this.$ExpenseByAllCategory.innerHTML = `
        <span class='expense-by-all-category__title'>카테고리 별 지출</span>
        <div class='expense-by-all-category__content'>
          <div class='content__chart'>
            <svg viewBox='-1.5 -1.5 3 3'>
            ${this.getDoughnutChartPath(this.$CategoryStatisticData)}
            </svg>
          </div>
          <div class='content__summary'>
          
          </div>
        <div>
      `;
  }

  getDoughnutChartPath(data: CategoryStatisticData[]) {
    let accumulatedPercent = 0;
    const paths = data
      .map(({ percent, category }, i) => {
        const [startX, startY] = this.getCoordinatesForPercent(accumulatedPercent);
        accumulatedPercent += percent;
        const [endX, endY] = this.getCoordinatesForPercent(accumulatedPercent);

        const isLargeArcFlag = percent > 0.5 ? 1 : 0;

        const targetRad = 2 * Math.PI * percent;
        const targetRestRad = 2 * Math.PI * (1 - percent);

        return `
        <path d='M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0' fill=none stroke-dasharray='${targetRad} ${targetRestRad}' stroke-width=0.4 stroke-dashoffset=${targetRad} stroke=${
          COLORS_BY_CATEGORY[category]
        }>
          <animate attributeName='stroke-dashoffset' from=${targetRad} to='0.025' dur='0.2' begin=${
          0.2 * i
        } fill="freeze"/>
        </path>
      `;
      })
      .join('');

    return paths;
  }

  getCoordinatesForPercent(percent: number): number[] {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);

    return [x, y];
  }
}
