import { COLORS_BY_CATEGORY, PICTOGRAM } from '@src/static/constants';
import { ExpenditureIcon, IncomeIcon } from '@src/static/image-urls';
import { CalendarEssentialData, CalendarModalData } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { createDOMWithSelector, formatDataIntoWon } from '@src/utils/helper';

import './CalendarModal.scss';

export default class CalendarModal {
  $CalendarModal: HTMLElement;
  data: CalendarModalData;
  isModalOpened: Boolean;
  posX: number;
  posY: number;

  constructor({ parent }) {
    this.$CalendarModal = createDOMWithSelector('aside', '.content__calendar__modal');
    parent.appendChild(this.$CalendarModal);

    handleEvent.subscribe('opencalendarmodal', (e: CustomEvent) => {
      if (!this.isModalOpened && e.detail.command === 'close') return;
      if (e.detail.command === 'close') return this.closeModal();
      if (e.detail.command === 'open') {
        this.closeModal();
        this.setModalPosition(e);
        this.openModal(e.detail.data);
      }
    });
  }

  /**
   * 모달을 닫을 경우 호출합니다.
   * isModalOpened 상태를 false로 만듭니다.
   */
  closeModal() {
    this.isModalOpened = false;
    this.$CalendarModal.classList.remove('open');
  }

  /**
   * 모달을 열게 될 경우 호출합니다.
   */
  openModal(data: any) {
    this.isModalOpened = true;
    this.data = data;
    this.$CalendarModal.classList.add('open');
    this.render();
  }

  /**
   * 모달의 위치를 정해줍니다.
   */
  setModalPosition(e: CustomEvent) {
    const { top, left } = e.detail.pos;
    const offsetX = -40;
    const offsetY = 220;

    this.$CalendarModal.setAttribute('style', `top:${top - offsetY}px;left:${left - offsetX}px`);
  }

  render() {
    const { date: dateData, dayData } = this.data;
    const { date, month, year } = dateData;

    if (!dayData) return;
    const { detail, dayTotalExpenditure, dayTotalIncome } = dayData;

    this.$CalendarModal.innerHTML = `
      <h2 class='modal__title'>${year}년 ${month}월 ${date}일</h2>
      <div class='modal__total-history'>${this.getTotalHistoryDOM(dayTotalExpenditure, dayTotalIncome)}</div>
      <div class='modal__detail-history'>${this.getDetailHistoryDOM(detail)}</div>
    `;
  }

  /**
   * 결제 내역에 대해 detailHistory DOM 요소를 생성하여 반환합니다.
   */
  getDetailHistoryDOM(detail: CalendarEssentialData[]) {
    return detail.reduce((acc, d) => [...acc, this.createDetailHistory(d)], []).join('');
  }

  /**
   * detailHistory DOM을 생성합니다.
   * 모달 내의 수입, 지출 내역에 해당하는 DOM 으로
   * category img, history content, price를 가집니다.
   */
  createDetailHistory(data: CalendarEssentialData) {
    const { price, category, historyContent } = data;

    const $detailHistory = createDOMWithSelector('div', '.detail-history');
    const $img = createDOMWithSelector('img');
    $img.setAttribute('src', PICTOGRAM[category]);

    const $content = createDOMWithSelector('span');
    $content.setAttribute('style', `color:${COLORS_BY_CATEGORY[category]}`);
    $content.innerText = historyContent;

    const $price = createDOMWithSelector('span');
    $price.setAttribute('style', `color:${category === 'income' ? '#1289A7' : '#E63950'}`);
    $price.innerText = formatDataIntoWon(price);

    $detailHistory.appendChild($img);
    $detailHistory.appendChild($content);
    $detailHistory.appendChild($price);

    return $detailHistory.outerHTML;
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
