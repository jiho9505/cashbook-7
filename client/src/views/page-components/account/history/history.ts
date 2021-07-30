import { $ } from '@src/utils/helper';
import { createDOMWithSelector, matchCategoryAndImg } from '@src/utils/helper';
import './history.scss';

export default class History {
  state: any;
  history: HTMLElement;
  constructor({ parent, state }) {
    this.history = createDOMWithSelector('div', '.history');

    parent.appendChild(this.history);
    this.setProperty(state);
    this.render();
  }

  setProperty(state): void {
    this.state = state;
  }

  render(): void {
    $('.history').innerHTML = `
        ${this.createHistoryHeader()}
        ${this.createHistoryContent()}
        `;
  }

  createHistoryHeader(): string {
    return `
      <div class='history__header'>
        <div class='history__header-left'>
          <span class='history__text'>내역</span>
          <span class='history__add'>+</span>
        </div>
        <div class='history__header-right'>
          <span>수입</span>  
          <span>${this.state.income}</span>
          <span>지출</span>
          <span>${this.state.expenditure}</span>
        </div>
      </div>`;
  }

  createHistoryContent(): string {
    return `
      <table class='table'>
        ${this.createTableHeader()}
        ${this.createTableContent()}
      </table>`;
  }

  createTableHeader(): string {
    return `
      <thead>
        <tr class='table__header' align='left'>
          <th class='table__content'>거래내용</th>
          <th class='table__category'>카테고리</th>
          <th class='table__date'>날짜</th>
          <th class='table__price'>금액</th>
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
            <tr class='table_row'>
                <td>
                    <div class='table__content-container'>
                        <img src=${image}>
                        <div class='table__content-detail'>
                            <span>${item.content}</span>
                            <span class='table__content-pay'>${item.payMethod}</span>
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
