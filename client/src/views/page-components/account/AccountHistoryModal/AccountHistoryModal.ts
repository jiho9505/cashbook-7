import { $, createDOMWithSelector } from '@src/utils/helper';
import './AccountHistoryModal.scss';
import handleEvent from '@src/utils/handleEvent';
import { CategoryImg } from '@src/static/constants';

export default class AccountHistoryModal {
  state: string;

  constructor() {
    handleEvent.subscribe('createhistorymodal', (e: CustomEvent) => {
      this.setState(e.detail.store);

      console.log('b');
      this.render();
      const modal = $('.account-histrory-modal');

      // modal.addEventListener('click', this.clickEventHandler.bind(this))
      // modal.addEventListener('keyup', this.keyupEventHandler.bind(this))
      // modal.addEventListener('focusout', this.focusoutEventHandler.bind(this))
    });
  }

  setState(state): void {
    this.state = state;
  }

  render(): void {
    $('#root').innerHTML += this.createModal();
  }

  createModal() {
    return `
        <div class="account-history-modal">
            <div class="overlay"></div>
            ${this.createForm()}
        </div>
      `;
  }

  createForm() {
    return `
      <div class="history-form">
        <form>
            <div class="history-form__date-money-container">
                ${this.createDateForm}
                ${this.createMoneyForm}
            </div>
            <div>
                ${this.createContentForm}
            </div>
            ${this.createPayMethodForm}
            ${this.createCategoryForm}
        </form> 
      </div>
    `;
  }

  createDateForm() {
    return `
     <div class="history-form__date-container">
        <span>일자</span>
        <input class="history-form__date" type="text" />
    </div>
    `;
  }
}
