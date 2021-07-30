import { cardType } from '@src/utils/helper';
import handleEvent from '@src/utils/handleEvent';
import { CheckButton, Option } from '@src/static/imageUrls';
import './payMethod.scss';

export default class PayMethod {
  state: any;
  PayWrapper: HTMLElement;

  constructor({ parent, state }) {
    this.PayWrapper = document.createElement('div');

    parent.appendChild(this.PayWrapper);
    this.setProperty(state);
    this.render();
  }

  setProperty(state): void {
    this.state = state;
  }

  render(): void {
    this.PayWrapper.innerHTML = `
        ${this.createPayMethod()}
        `;
  }

  createPayMethod(): string {
    return `
      <div>
        <div class='pay-container'>
          <span class='pay-text'>결제수단</span>
          <span class='pay'>+</span>
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
                ${pay.payMethodMoney}
              </div>

              <div class='card-check active'>
                <img src=${CheckButton}>
              </div>
              <div class='card-option'>
                <img src=${Option}>
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
