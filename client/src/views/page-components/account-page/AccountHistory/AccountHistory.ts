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

    this.history.addEventListener('click', this.onClickHandler.bind(this));
    this.history.addEventListener('mouseover', this.onMouseOverHandler.bind(this));
  }

  onMouseOverHandler(e: MouseEvent) {
    this.onMouseOverCategory(e);
  }

  onMouseOverCategory(e: MouseEvent) {}

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
          <th class='account-history-table__category'><span>분류</span>${this.createChoiceCategoryBar()}</th>
          <th class='account-history-table__date'><span>날짜</span></th>
          <th class='account-history-table__price'>금액</th>
        </tr>
      </thead>`;
  }

  createChoiceCategoryBar(): string {
    return `
      <div class="category-container">
       ${this.createCategoryList()}
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
