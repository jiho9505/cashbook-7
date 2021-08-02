import { $, createDOMWithSelector } from '@src/utils/helper';
import handleEvent from '@src/utils/handleEvent';
<<<<<<< HEAD:client/src/views/page-components/account-page/AccountHistory/AccountHistory.ts
import { matchCategoryAndImg } from '@src/static/constants';
<<<<<<< HEAD:client/src/views/page-components/account-page/AccountHistory/AccountHistory.ts
import './AccountHistory.scss';
import { CheckActive, CheckNonActive } from '@src/static/image-urls';
=======
=======
import { matchCategoryAndImg, categoryList } from '@src/static/constants';
>>>>>>> 3c88c2a ([#16] feat : Category Bar 구현):client/src/views/page-components/account/AccountHistory/AccountHistory.ts
import { CheckActive, CheckNonActive } from '@src/static/imageUrls';
>>>>>>> d8dc6f7 ([#16] feat : AddButton Click 이벤트 추가):client/src/views/page-components/account/AccountHistory/AccountHistory.ts

import './AccountHistory.scss';

export default class AccountHistory {
  state: any;
  history: HTMLElement;

  constructor({ parent, state }) {
    this.history = createDOMWithSelector('div', '.account-history');

    parent.appendChild(this.history);
    this.setProperty(state);
    this.render();

    const category = this.history.querySelector('.account-history-table__category');

    this.history.addEventListener('click', this.onClickHandler.bind(this));
    this.history.addEventListener('mouseover', this.onMouseOverHandler.bind(this));
    this.history.addEventListener('mouseout', this.onMouseOutHandler.bind(this));
  }

  /**
   * 전체에 이벤트를 거니 마우스 움직일때마다 검사하는게 성능에 괜찮은지 궁금하네요!
   */
  onMouseOverHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'account-history-table__category-span') {
      $('.category-container').classList.add('active');
    } else if (target.className === 'account-history-table__date-span') {
      $('.date-container').classList.add('active');
    }
  }

  onMouseOutHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'account-history-table__category-span') {
      $('.category-container').classList.remove('active');
    } else if (target.className === 'account-history-table__date-span') {
      $('.date-container').classList.remove('active');
    }
  }

  onClickHandler(e: MouseEvent) {
    this.onClickAddButton(e);
  }

  onClickAddButton(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'account-history__add') handleEvent.fire('createhistorymodal'); // 자신의 결제수단 데이터를 넘겨줄것 state는 없어도 됨
  }

  setProperty(state): void {
    this.state = state;
  }

  render(): void {
    $('.account-history').innerHTML = `
        ${this.createHistoryHeader()}
        ${this.createHistoryContent()}
        `;
  }

  createHistoryHeader(): string {
    return `
      <div class='account-history__header'>
        <div class='account-history__header-left'>
          <span class='account-history__text'>내역</span>
          <span class='account-history__add'>+</span>
        </div>
        <div class='account-history__header-right'>
          <div class='account-history__income'>
            <img class='account-history__income-img' src= ${CheckActive}>
            <span>수입 ${this.state.income}</span>
          </div>
          <div class='account-history__expenditure'>
            <img class='account-history__expenditure-img' src= ${CheckActive}>
            <span >지출 ${this.state.expenditure}</span>
          </div>
          
        </div>
      </div>`;
  }

  createHistoryContent(): string {
    return `
      <table class='account-history-table'>
        ${this.createTableHeader()}
        ${this.createTableContent()}
      </table>`;
  }

  createTableHeader(): string {
    return `
      <thead>
        <tr class='account-history-table__header' align='left'>
          <th class='account-history-table__content'>거래내용</th>
          <th class='account-history-table__category'><span class='account-history-table__category-span'>분류</span>${this.createCategoryChoiceBar()}</th>
          <th class='account-history-table__date'><span class='account-history-table__date-span'>날짜</span>${this.createDateChoiceBar()}</th>
          <th class='account-history-table__price'>금액</th>
        </tr>
      </thead>`;
  }

  createCategoryChoiceBar(): string {
    return `
      <div class="category-container">
       ${this.createCategoryList()}
      </div>
    `;
  }

  createDateChoiceBar(): string {
    return `
      <div class="date-container">
        ${this.createWholeDateChoice()}
        ${this.createSpecificDateChoice()}
        <div>
        </div>
      </div>
    `;
  }

  createWholeDateChoice(): string {
    return `
      <div class="date__whole">
        <img src=${CheckActive}>
        <span>전체</span>
      </div>`;
  }

  createSpecificDateChoice(): string {
    return `
      <div class="date__specific">
        <img src=${CheckNonActive}>
        <span>특정 날짜 선택</span>
        <div>
          <input type='text'>
        </div>
      </div>
    `;
  }
  createCategoryList() {
    return categoryList
      .map((category, idx) => {
        return `
            <div class="category-list active">
                <img src=${matchCategoryAndImg[category]}>
            </div>
        `;
      })
      .join('');
  }

  createTableContent(): string {
    return `
      <tbody>
        ${this.createContentDetail()}
      </tbody>`;
  }

  createContentDetail() {
    return this.state.detail
      .map((item) => {
        const image = matchCategoryAndImg[item.category];
        return `
            <tr class='account-history-table_row'>
                <td>
                    <div class='account-history-table__content-container'>
                        <img src=${image}>
                        <div class='account-history-table__content-detail'>
                            <span>${item.content}</span>
                            <span class='account-history-table__content-pay'>${item.payMethod}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span>${item.category}</span>
                </td>
                <td>
                    <span>${item.createdAt}</span>
                </td>
                <td>
                    <span>${item.price}</span>
                </td>
            </tr>
        `;
      })
      .join('');
  }
}
