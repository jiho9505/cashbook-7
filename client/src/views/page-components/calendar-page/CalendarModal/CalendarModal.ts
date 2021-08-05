import { CalendarEssentialData } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { createDOMWithSelector } from '@src/utils/helper';

import './CalendarModal.scss';

export default class CalendarModal {
  $CalendarModal: HTMLElement;
  isModalOpened: false;
  data: CalendarEssentialData;
  posX: number;
  posY: number;

  constructor({ parent }) {
    this.$CalendarModal = createDOMWithSelector('div', '.content__calendar__modal');

    handleEvent.subscribe('opencalendarmodal', (e: CustomEvent) => {
      if (!this.isModalOpened && e.detail.command === 'close') return;

      if (e.detail.command === 'open') {
        this.data = e.detail.data.dayData;
        this.render();
      }
    });
  }

  render() {
    console.log(this.data);
  }
}
