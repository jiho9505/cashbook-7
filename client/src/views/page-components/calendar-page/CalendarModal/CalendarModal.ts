import { ExpenditureIcon, IncomeIcon } from '@src/static/image-urls';
import { CalendarModalData } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { createDOMWithSelector, formatDataIntoWon } from '@src/utils/helper';

import './CalendarModal.scss';

export default class CalendarModal {
  $CalendarModal: HTMLElement;
  data: CalendarModalData;
  isModalOpened: false;
  posX: number;
  posY: number;

  constructor({ parent }) {
    this.$CalendarModal = createDOMWithSelector('aside', '.content__calendar__modal');
    parent.appendChild(this.$CalendarModal);

    handleEvent.subscribe('opencalendarmodal', (e: CustomEvent) => {
      if (!this.isModalOpened && e.detail.command === 'close') return;

      if (e.detail.command === 'open') {
        this.data = e.detail.data;
        this.render();
      }
    });
  }

  render() {
    const { date: dateData, dayData } = this.data;
    const { date, month, year } = dateData;
    const { detail, dayTotalExpenditure, dayTotalIncome } = dayData;

    console.log('date, month, year: ', date, month, year);
    this.$CalendarModal.innerHTML = `
      <h2 class='modal__title'>${year}년 ${month}월 ${date}일</h2>
      <div class='modal__total-history'>${this.getTotalHistoryDOM(dayTotalExpenditure, dayTotalIncome)}</div>
    `;
  }

  /**
   * 총 수입, 지출 내역을 모달에 표시합니다.
   */
  getTotalHistoryDOM(expenditure: number, income: number) {
    return `
      <div class='modal__total-history--expenditure'>
        <img src=${ExpenditureIcon} alt='expenditure'>
        <span>${formatDataIntoWon(expenditure)}</span>
      </div>
      <div class='modal__total-history--income'>
        <img src=${IncomeIcon} alt='income'>
        <span>${formatDataIntoWon(income)}</span>
      </div>
    `;
  }
}
