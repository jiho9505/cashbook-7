import { api } from '@src/models/api';
import { Month, Year } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

import './index.scss';
import CalendarView from './Calendar/Calendar';
import CalendarModal from './CalendarModal/CalendarModal';

import './index.scss';

export default class CalendarPageView {
  currentYear: Year;
  currentMonth: Month;
  currentCalendarData: [];

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      const { path, month, year, accessToken } = e.detail.state;
      if (path !== '/calendar') return;
      this.currentYear = year;
      this.currentMonth = month;

      const fetchCalendarDataURL = `/account-history?expenditureDay=${year}-${month.toString().padStart(2, '0')}`;

      api.get(fetchCalendarDataURL, accessToken).then((res) => {
        if (res.success) {
          this.currentCalendarData = res.data.accountHistory;
          this.render();
        }
      });
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__calendar'></div>`;

    new CalendarView({
      parent: $('.content__calendar'),
      currentYear: this.currentYear,
      currentMonth: this.currentMonth,
      currentCalendarData: this.currentCalendarData,
    });
    new CalendarModal({ parent: $('.content__calendar') });
  }
}
