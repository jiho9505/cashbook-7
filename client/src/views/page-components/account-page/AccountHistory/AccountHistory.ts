import { $, createDOMWithSelector } from '@src/utils/helper';
import { matchCategoryAndImg } from '@src/static/constants';
import './AccountHistory.scss';
import { CheckActive, CheckNonActive } from '@src/static/image-urls';

export default class AccountHistory {
  state: any;
  history: HTMLElement;
  constructor({ parent, state }) {
    this.history = createDOMWithSelector('div', '.account-history');

    parent.appendChild(this.history);
    this.setState(state);
    this.render();
  }

  setState(state): void {
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
          <th class='account-history-table__category'>카테고리</th>
          <th class='account-history-table__date'>날짜</th>
          <th class='account-history-table__price'>금액</th>
        </tr>
      </thead>`;
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
