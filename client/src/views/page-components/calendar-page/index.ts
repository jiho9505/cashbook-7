import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';
import Calendar from './Calendar/Calendar';

export default class CalendarPageView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/calendar') return;
      this.render();
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<div class='content__calendar'></div>`;

    new Calendar({ parent: $('.content__calendar') });
  }
}
