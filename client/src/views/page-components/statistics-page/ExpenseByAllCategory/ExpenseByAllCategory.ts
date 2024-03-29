import { api } from '@src/models/api';
import { COLORS_BY_CATEGORY, NAME_BY_CATEGORY } from '@src/static/constants';
import { ArcSVGCommandAttribute, CategoryInfoType, CategoryStatisticData, Coord, HTMLText } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { createDOMWithSelector } from '@src/utils/helper';

import './ExpenseByAllCategory.scss';

export default class ExpenseByAllCategory {
  $ExpenseByAllCategory: HTMLElement;
  categoryStatisticData: CategoryStatisticData[];
  accessToken: string;
  categoryInfos: CategoryInfoType[];

  constructor({ parent, state, token }) {
    this.$ExpenseByAllCategory = createDOMWithSelector('div', '.expense-by-all-category');
    parent.appendChild(this.$ExpenseByAllCategory);

    this.categoryStatisticData = state;
    this.accessToken = token;

    api.get('/category', token).then((res) => {
      if (res.success) {
        this.categoryInfos = res.data.payments.map(({ id, name }) => ({ id, name }));
        handleEvent.fire('changecategory', { category: this.categoryInfos[0] });
      }
    });

    this.render();
    this.$ExpenseByAllCategory.addEventListener('click', (e) => this.onClickPathElement(e, this));
  }

  /**
   * path를 클릭 했을 시,
   * 해당 path의 카테고리 id, name을 찾아 changecategory event를 fire 합니다.
   */
  onClickPathElement(e: Event, that: any) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'path') return;

    const category = target.dataset.category;
    const categoryInfo: CategoryInfoType = that.categoryInfos.find(({ name }) => name === category);
    handleEvent.fire('changecategory', { category: categoryInfo });
  }

  render() {
    this.$ExpenseByAllCategory.innerHTML = `
        <span class='expense-by-all-category__title'>카테고리 별 지출</span>
        <div class='expense-by-all-category__content'>
          <div class='content__chart'>
            <svg viewBox='-1.5 -1.5 3 3'>
              ${this.getDoughnutChartPaths(this.categoryStatisticData)}
            </svg>
          </div>
          <div class='content__summary'>
            ${this.getCategorySummariesDOM(this.categoryStatisticData)}
          </div>
        <div>
      `;
  }

  /**
   * categoryStatisticData를 순회하며,
   * 해당 데이터를 DoughnutChartPath의 DOM으로 변환합니다.
   *
   */
  getDoughnutChartPaths(data: CategoryStatisticData[]): HTMLText {
    let accumulatedPercent = 0;
    const paths = data
      .map(({ percent, category }, idx) => {
        const [startX, startY] = this.getCoordinatesForPercent(accumulatedPercent);
        accumulatedPercent += percent;
        const [endX, endY] = this.getCoordinatesForPercent(accumulatedPercent);
        const isLargeArcFlag = percent > 0.5 ? 1 : 0;

        return this.getCategoryDataPath({ percent, category }, { startX, startY, endX, endY, isLargeArcFlag }, idx);
      })
      .join('');

    return paths;
  }

  /**
   * 차트 데이터를 받아 호를 그립니다.
   * 호는 M 명령어를 사용해 startX, startY로 이동하고,
   * A 명령어를 사용해 호를 그리며,
   * L 명령어로 시작점으로 선을 긋습니다.
   *
   * 회전하며 생성되는 애니메이션을 만들기 위해,
   * animate 태그를 사용합니다.
   * 호끼리 약간 떨어져있는 느낌을 주기 위해 to 속성에 0.025 값을 줍니다.
   */
  getCategoryDataPath(
    { percent, category }: CategoryStatisticData,
    { startX, startY, endX, endY, isLargeArcFlag }: ArcSVGCommandAttribute,
    idx: number
  ): HTMLText {
    const targetRad = 2 * Math.PI * percent;
    const targetRestRad = 2 * Math.PI * (1 - percent);
    const animationDuration = 0.2;

    const $path = document.createElementNS('http://www.w3.org/1999/svg', 'path');
    $path.setAttribute('data-category', category);
    $path.setAttribute('d', `M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`);
    $path.setAttribute('fill', 'none');
    $path.setAttribute('stroke-width', '0.4');
    $path.setAttribute('stroke', `${COLORS_BY_CATEGORY[category]}`);
    $path.setAttribute('stroke-dasharray', `${targetRad} ${targetRestRad}`);
    $path.setAttribute('stroke-dashoffset', `${targetRad}`);

    const $animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    $animate.setAttribute('attributeName', 'stroke-dashoffset');
    $animate.setAttribute('begin', `${animationDuration * idx}`);
    $animate.setAttribute('from', `${targetRad}`);
    $animate.setAttribute('to', '0.025');
    $animate.setAttribute('dur', `${animationDuration}`);
    $animate.setAttribute('fill', 'freeze');
    $path.appendChild($animate);

    return $path.outerHTML;
  }

  /**
   * SVG viewBox에서,
   * percent에 해당하는 x, y 좌표를 반환합니다.
   * viewBox의 원 반지름이 1이므로,
   * x 는 cos theta, y는 sin theta 입니다.
   */
  getCoordinatesForPercent(percent: number): Coord[] {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);

    return [x, y];
  }

  /**
   * 카테고리 요약 section에 넣기 위한 DOM 들을 생성합니다.
   */
  getCategorySummariesDOM(data: CategoryStatisticData[]): HTMLText {
    return data.map((d) => this.getCategorySummary(d)).join('');
  }

  /**
   * 카테고리 요약본이 담겨 있는 HTML string 입니다.
   * 색상, 카테고리 이름, 퍼센티지로 구성됩니다.
   */
  getCategorySummary(data: CategoryStatisticData): HTMLText {
    return `
      <div class='category-summary'>
        <div class='category-summary__color' style='background-color: ${COLORS_BY_CATEGORY[data.category]}'></div>
        <span class='category-summary__name'>${NAME_BY_CATEGORY[data.category]}</span>
        <span class='category-summary__percent'>${(data.percent * 100).toFixed(1)}%</span>
      </div>
    `;
  }
}
