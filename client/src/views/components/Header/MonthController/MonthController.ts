import { Arrow, MonthControlImage } from '@src/static/image-urls';
import { Direction, HTMLText, Month, Year } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector, monthText } from '@src/utils/helper';

import './MonthController.scss';

export default class MonthController {
  $monthController: HTMLElement;
  currentYear: Year;
  currentMonth: Month;

  constructor(year: Year, month: Month) {
    console.log('call');
    this.$monthController = createDOMWithSelector('div', '.header__month-controller');
    $('header').appendChild(this.$monthController);
    this.currentYear = year;
    this.currentMonth = month;

    this.render();

    $('.arrow-wrapper').addEventListener('click', (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;

      if (e.target.closest('.upper-arrow')) this.changeMonth('up');
      if (e.target.closest('.down-arrow')) this.changeMonth('down');
    });
  }

  /**
   * 조건에 맞게 년도, 월을 변경합니다.
   * 변경된 년도, 월을 storeupdated 이벤트로 담아 보냅니다.
   */
  changeMonth(type: Direction) {
    let nextYear: Year = this.currentYear;
    let nextMonth: Month = this.currentMonth;

    if (type === 'up' && this.currentMonth === 12) {
      nextYear = this.currentYear + 1;
      nextMonth = 1;
    }

    if (type === 'up' && this.currentMonth !== 12) {
      nextMonth = this.currentMonth + 1;
    }

    if (type === 'down' && this.currentMonth === 1) {
      nextYear = this.currentYear - 1;
      nextMonth = 12;
    }

    if (type === 'down' && this.currentMonth !== 1) {
      nextMonth = this.currentMonth - 1;
    }

    handleEvent.fire('storeupdated', { state: { ...history.state, year: nextYear, month: nextMonth } });
  }

  render() {
    this.$monthController.innerHTML = `
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
