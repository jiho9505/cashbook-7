import { createDOMWithSelector } from '@src/utils/helper';

import './Calendar.scss';

export default class Calendar {
  $Calendar: HTMLElement;

  constructor({ parent }) {
    this.$Calendar = createDOMWithSelector('table', '.calendar');

    parent.appendChild(this.$Calendar);
    this.render();
  }

  render() {
    this.$Calendar.innerHTML = ``;

    this.getFullDateOnCalendar();
  }

  getFullDateOnCalendar() {}
}
