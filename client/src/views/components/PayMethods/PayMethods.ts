import { cardType } from '@src/static/constants';
import handleEvent from '@src/utils/handleEvent';
import { CheckButton, ETC, Xbox } from '@src/static/imageUrls';
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

    this.PayWrapper.addEventListener('click', this.onClickHandler.bind(this));
  }

  onClickHandler(e: MouseEvent) {
    this.onClickAddButton(e);
    this.onClickCardChoice(e);
    // this.onClickXbox(e);
  }

  onClickAddButton(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'pay') handleEvent.fire('createhistorymodal', {});
  }

  onClickCardChoice(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'card') {
      const currentCardIdx = Number(target.dataset.idx);
      const currentCardName = this.state[currentCardIdx].payMethodName;
      console.log(currentCardName); // 필터의 기준
      const checkButton = target.querySelector('#checkbutton');
      if (checkButton.classList.contains('active')) {
        checkButton.classList.remove('active');
        // 옵저버 (필터)
      } else {
        checkButton.classList.add('active');
        // 옵저버 (필터)
        this.removeOthersClassList(currentCardIdx);
      }
    }
  }

  removeOthersClassList(currentCardIdx) {
    const allCheckElement = document.querySelectorAll('#checkbutton');

    for (let i = 0; i < allCheckElement.length; i++) {
      if (i !== currentCardIdx) {
        allCheckElement[i].classList.remove('active');
      }
    }
  }

  // onClickXbox(e: MouseEvent) {
  //   const { target } = e;
  //   if (!(target instanceof HTMLElement)) return;
  //   if (target.className === 'card-xbox-img') console.log('hi');
  // }

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
            <div class='card ${cardType[pay.payMethodName]}' id='card' data-idx=${idx}>
              <div class='card-price'>
                ${this.isHistoryModal() ? `` : `${pay.payMethodMoney}`}
              </div>

              <div class='card-check' id='checkbutton'>
                <img src=${CheckButton}>
              </div>
              <div class='card-xbox'>
                ${this.isHistoryModal() ? `` : `<img class='card-xbox-img' src=${Xbox}>`}
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
