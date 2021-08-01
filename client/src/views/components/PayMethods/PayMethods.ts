import { cardType } from '@src/static/constants';
import handleEvent from '@src/utils/handleEvent';
import { CheckButton, ETC, Xbox } from '@src/static/imageUrls';
import './PayMethods.scss';
import { $, removeOthersClassList } from '@src/utils/helper';

export default class PayMethod {
  state: any;
  PayWrapper: HTMLElement;
  mode: string = 'Account';
  currentMode: HTMLElement;
  currentCardName: string = '';

  constructor({ parent, state }) {
    if (parent === $('.history-form__pay-method')) this.mode = 'historyModal';

    this.PayWrapper = document.createElement('div');

    parent.appendChild(this.PayWrapper);
    this.setState(state);
    this.render();

    this.currentMode = document.querySelector('#' + this.mode);
    this.currentMode.addEventListener('click', this.onClickHandler.bind(this));
  }

  onClickHandler(e: MouseEvent) {
    this.onClickAddButton(e);
    this.onClickCardChoice(e);
    // this.onClickXbox(e);
  }

  onClickAddButton(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    if (target.className === 'pay') handleEvent.fire('createhistorymodal'); // 자신의 결제수단 데이터를 넘겨줄것 state는 없어도 됨
  }

  onClickCardChoice(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'card') {
      const currentCardIdx = Number(target.dataset.idx);
      const checkButton = target.querySelector('#checkbutton');

      if (checkButton.classList.contains('active')) {
        checkButton.classList.remove('active');
        this.currentCardName = '';
        // 모달이 아닐때 옵저버 (필터)
      } else {
        checkButton.classList.add('active');
        this.currentCardName = this.state[currentCardIdx].payMethodName;
        // 모달이 아닐때 옵저버 (필터)
        removeOthersClassList(currentCardIdx, this.currentMode, '#checkbutton');
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
      <div id=${this.mode}>
        <div class='pay-container'>
          <span class='pay-text'>결제수단</span>
          ${this.isHistoryModal() ? `` : `<span class='pay'>+</span>`}
        </div>
        
        <div class='card-container' id=${this.mode}>
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
