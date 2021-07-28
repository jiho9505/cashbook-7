import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class CalendarView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/calendar') return;

      this.render();
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<h1>Calendar!!!</h1>`;
  }
}
