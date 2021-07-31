import { cardType } from '@src/static/constants';
import handleEvent from '@src/utils/handleEvent';
import { CheckButton, Xbox } from '@src/static/imageUrls';
import './PayMethods.scss';
import { $ } from '@src/utils/helper';

export default class PayMethod {
  state: any;
  PayWrapper: HTMLElement;
  mode: string = 'Account';

  constructor({ parent, state }) {
    if (parent === $('.history-form__pay-method')) this.mode = 'historyModal';

    this.PayWrapper = document.createElement('div');

    parent.appendChild(this.PayWrapper);
    this.setState(state);
    this.render();

    this.PayWrapper.addEventListener('click', () => {
      if (this.mode === 'historyModal') return;
      handleEvent.fire('createhistorymodal', {});
    });
  }

  setState(state): void {
    this.state = state;
  }

  render(): void {
    this.PayWrapper.innerHTML = `
        ${this.createPayMethod()}
        `;
  }

  /**
    Modal에서 나온 부분인지 Account 페이지에서 나온 부분인지 판단
   */
  isHistoryModal(): boolean {
    if (this.mode === 'historyModal') return true;
    return false;
  }

  createPayMethod(): string {
    return `
      <div>
        <div class='pay-container'>
          <span class='pay-text'>결제수단</span>
          ${this.isHistoryModal() ? `` : `<span class='pay'>+</span>`}
        </div>
        
        <div class='card-container'>
          ${this.createCard()}
        </div>
      </div>`;
  }

  createCard(): string {
    return this.state
      .map((pay, idx) => {
        return `
            <div class='card ${cardType[pay.payMethodName]}'>
              <div class='card-price'>
              ${this.isHistoryModal() ? `` : `${pay.payMethodMoney}`}
              </div>

              <div class='card-check active'>
                <img src=${CheckButton}>
              </div>
              <div class='card-option'>
              ${this.isHistoryModal() ? `` : `<img src=${Xbox}>`}
              </div>
              <div class='card-name'>
                ${pay.payMethodName}
              </div>
            </div>
          `;
      })
      .join('');
  }
}
