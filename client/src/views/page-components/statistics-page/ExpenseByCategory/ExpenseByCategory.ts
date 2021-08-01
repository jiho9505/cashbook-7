import { $, createDOMWithSelector } from '@src/utils/helper';
import './ExpenseByCategory.scss';

export default class ExpenseByCategory {
  $ExpenseByCategory: HTMLElement;
  data: number[];

  constructor({ parent, state }) {
    this.$ExpenseByCategory = createDOMWithSelector('div', '.expense-by-category');
    this.data = state;

    parent.appendChild(this.$ExpenseByCategory);
    this.render();
  }

  render() {
    this.$ExpenseByCategory.innerHTML = `
        <span>생활 카테고리 소비 추이</span>
        <div class='expense-by-category__content'>
          <svg class='content__curved-chart' xmlns='http://www.w3.org/2000/svg' viewBox='0 -35 995 317'></svg>
        </div>
      `;

    $('.content__curved-chart').appendChild(this.getSvgChartPath());
  }

  /**
   * 곡선 차트를 위한 Path를 가져오는 함수입니다.
   * animation 효과를 위해 path 내에 animate 태그를 추가합니다.
   */
  getSvgChartPath() {
    const $path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    $path.setAttribute('d', this.getPathDAttribute(this.data));
    $path.setAttribute('fill', 'none');
    $path.setAttribute('stroke', '#3E2B75');
    $path.setAttribute('stroke-width', '3');
    $path.setAttribute('stroke-dasharray', `${$path.getTotalLength()}`);

    const $animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    $animate.setAttribute('attributeName', 'stroke-dashoffset');
    $animate.setAttribute('from', `${$path.getTotalLength()}`);
    $animate.setAttribute('to', '0');
    $animate.setAttribute('dur', '1.5');
    $animate.setAttribute('fill', 'freeze');
    $path.appendChild($animate);

    return $path;
  }

  /**
   * path 태그의 d 속성값을 얻는 함수입니다.
   * 곡선 구현을 위해 C 속성을 사용하였습니다.
   * 만약, 시작점일 경우 M 속성을 사용합니다.
   */
  getPathDAttribute(data: number[]): string {
    const coords = this.getCoordinates(data);

    const d = coords.reduce((acc, curr, idx, arr) => {
      const isFirstPoint = idx === 0;

      if (isFirstPoint) return `M ${curr[0]},${curr[1]}`;

      const [cpsX, cpsY] = this.getControlPoint(arr[idx - 2], arr[idx - 1], curr);
      const [cpeX, cpeY] = this.getControlPoint(arr[idx - 1], curr, arr[idx + 1], true);
      return `${acc} C ${cpsX}, ${cpsY} ${cpeX}, ${cpeY} ${curr[0]}, ${curr[1]}`;
    }, '');

    return d;
  }

  /**
   * Path 태그의 C command를 사용하기 위해 control point를 구합니다.
   * getOpposedLine의 결과값 angle, length를 사용하여 구할 수 있습니다.
   *
   * 만약 prev나 next가 없는 점, 즉 시작, 끝점일 경우 current로 replace 합니다.
   */
  getControlPoint(prev: number[], curr: number[], next: number[], isEndControlPoint?: boolean) {
    const p = prev || curr;
    const n = next || curr;

    const smoothDegree = 0.3;

    const o = this.getOpposedLine(p, n);

    const angle = o.angle + (isEndControlPoint ? Math.PI : 0);
    const length = o.length * smoothDegree;

    const x = curr[0] + Math.cos(angle) * length;
    const y = curr[1] + Math.sin(angle) * length;

    return [x, y];
  }

  /**
   * 현재 점을 기준으로,
   * 이전 점과 다음 점을 이은 선의 길이와 각도,
   * opposedLine을 구합니다.
   */
  getOpposedLine(pointA: number[], pointB: number[]) {
    const xLength = pointB[0] - pointA[0];
    const yLength = pointB[1] - pointA[1];

    const zLength = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
    const angle = Math.atan2(yLength, xLength);
    return { length: zLength, angle };
  }

  /**
   * SVG viewBox에 그려질 좌표를 구합니다.
   * x좌표는 array의 index 값이며 (날짜 - 1),
   * y좌표는 (현재값 / 최대값) * 높이 입니다.
   */
  getCoordinates(data: number[]) {
    const { width: SVGWidth, height: SVGHeight } = $('.content__curved-chart').getBoundingClientRect();
    const maxDayOnMonth = 30;

    const intervalX = SVGWidth / (maxDayOnMonth - 6);
    const intervalY = SVGHeight;
    const max = Math.max(...data);
    return data.reduce((acc, curr, idx) => [...acc, [idx * intervalX, (curr / max) * intervalY]], []);
  }

  /**
   * 수평선에 사용할 데이터를 구합니다.
   * 최고, 최저값을 구해 5등분합니다.
   */
  getHorizontalDataInterval(data: number[]): number[] {
    const intervalAmount = 5;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const intervalValue = Math.floor((max - min) / (intervalAmount - 1));

    const distributedData = [...new Array(intervalAmount).keys()].reduce((acc, curr, idx) => {
      if (idx === 0) return [min];
      if (idx === intervalAmount - 1) return [...acc, max];
      return [...acc, intervalValue * idx];
    }, []);

    return distributedData;
  }
}
