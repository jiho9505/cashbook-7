import { createDOMWithSelector } from '@src/utils/helper';
import './ExpenseByCategory.scss';

export default class ExpenseByCategory {
  $ExpenseByCategory: HTMLElement;

  constructor({ parent }) {
    this.$ExpenseByCategory = createDOMWithSelector('div', '.expense-by-category');

    parent.appendChild(this.$ExpenseByCategory);
    this.render();
  }

  render() {
    this.$ExpenseByCategory.innerHTML = `
        <span>생활 카테고리 소비 추이</span>
    `;
  }
}
