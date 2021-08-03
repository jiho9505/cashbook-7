import { Arrow, MonthControlImage } from '@src/static/image-urls';
import { HTMLText } from '@src/types';
import { $, createDOMWithSelector } from '@src/utils/helper';

import './MonthController.scss';

export default class MonthController {
  $MonthController: HTMLElement;

  constructor() {
    this.$MonthController = createDOMWithSelector('div', '.header__month-controller');
    $('header').appendChild(this.$MonthController);

    this.render();
  }

  render() {
    this.$MonthController.innerHTML = `
        ${this.getCalenderSVG()}
        ${this.getArrowSVG()}
    `;
  }

  /**
   * 달력 SVG DOM을 추가합니다.
   */
  getCalenderSVG(): HTMLText {
    const $calendarWrapper = createDOMWithSelector('div', '.calendar-wrapper');
    $calendarWrapper.innerHTML = `
        <img src=${MonthControlImage}>
        <span class='calendar-wrapper__month'>Aug</span>
        <span class='calendar-wrapper__year'>2021</span>
    `;

    return $calendarWrapper.outerHTML;
  }

  /**
   * 화살표 SVG DOM을 추가합니다.
   */
  getArrowSVG(): HTMLText {
    const $arrowWrapper = createDOMWithSelector('ul', '.arrow-wrapper');
    $arrowWrapper.innerHTML = `
        <li class='upper-arrow'><img src=${Arrow}></li>
        <li class='down-arrow'><img src=${Arrow}></li>
      `;

    return $arrowWrapper.outerHTML;
  }
}
