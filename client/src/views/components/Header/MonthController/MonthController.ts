import { Arrow, MonthControlImage } from '@src/static/image-urls';
import { HTMLText, Month, Year } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector, monthText } from '@src/utils/helper';

import './MonthController.scss';

export default class MonthController {
  $MonthController: HTMLElement;
  currentYear: Year;
  currentMonth: Month;

  constructor(year: Year, month: Month) {
    console.log('call');
    this.$MonthController = createDOMWithSelector('div', '.header__month-controller');
    $('header').appendChild(this.$MonthController);
    this.currentYear = year;
    this.currentMonth = month;

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
        <span class='calendar-wrapper__month'>${monthText[this.currentMonth]}</span>
        <span class='calendar-wrapper__year'>${this.currentYear}</span>
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
