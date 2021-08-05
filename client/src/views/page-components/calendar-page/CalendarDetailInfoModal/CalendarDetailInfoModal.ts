import { CalendarEssentialData } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import './CalendarDetailInfoModal.scss';

export default class CalendarDetailInfoModal {
  isModalOpened: false;
  data: CalendarEssentialData;
  posX: number;
  posY: number;

  constructor() {
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
