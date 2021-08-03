import { Month, Year } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';
import CalendarView from './Calendar/Calendar';

import './index.scss';

export default class CalendarPageView {
  currentYear: Year;
  currentMonth: Month;

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      const { path, month, year } = e.detail.state;
      if (path !== '/calendar') return;
      this.currentYear = year;
      this.currentMonth = month;
      this.render();
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__calendar'></div>`;

    new CalendarView({
      parent: $('.content__calendar'),
      currentYear: this.currentYear,
      currentMonth: this.currentMonth,
    });
  }
}
