import { objToChangeCardNameFromKoreanToEng } from '@src/static/constants';
import handleEvent from '@src/utils/handleEvent';
import { CheckButton, ETC, Xbox } from '@src/static/image-urls';
import './PayMethods.scss';
import { $, removeActiveAttributeOnClass } from '@src/utils/helper';
import ConfirmWindow from '../Confirm/Confirm';

export default class PayMethod {
  state: any;
  PayWrapper: HTMLElement;
  mode: string = 'Account';
  currentMode: HTMLElement;
  filter: any;
  currentCardIdx: number;

  constructor({ parent, state, filter }) {
    if (parent === $('.history-form__pay-method')) this.mode = 'historyModal';

    this.PayWrapper = document.createElement('div');

    parent.appendChild(this.PayWrapper);
    this.setProperty(state, filter);
    this.render();

    this.currentMode = document.querySelector('#' + this.mode);
    this.currentMode.addEventListener('click', this.onClickHandler.bind(this));
  }

  setProperty(state, filter): void {
    console.log('filter: ', filter);
    this.state = state;
    this.filter = filter;
  }

  render(): void {
    this.PayWrapper.innerHTML = `
        ${this.createPayMethod()}
        `;
  }

  onClickHandler(e: MouseEvent) {
    this.onClickCardChoice(e);
    this.onClickXbox(e);
  }

  onClickXbox(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'card-xbox-img')
      new ConfirmWindow({
        onClickConfirmWindowHandler: this.onClickConfirmWindowHandler.bind(this),
        addText: '( 삭제 시 내역 데이터도 삭제됩니다❗️)',
      });
  }

  /**
   * TODO:
   * target.className === 'confirm__delete일 때
   *  card Id 넘겨줘야하며 그 card Id는 target.dataset에서 get 하면 될거같습니다
   */
  onClickConfirmWindowHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (['confirm__overlay', 'confirm__cancel'].includes(target.className)) {
      $('#root').removeChild($('.confirm'));
    } else if (target.className === 'confirm__delete') {
      $('#root').removeChild($('.confirm'));

      handleEvent.fire('deleteaboutaccount', {});
    }
  }

  onClickCardChoice(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'card') {
      const currentCardIdx = Number(target.dataset.idx);
      const checkButton = target.querySelector('#checkbutton');

      if (checkButton.classList.contains('active')) {
        checkButton.classList.remove('active');
        this.currentCardIdx = 0;
        !this.isHistoryModal() && handleEvent.fire('filterchange', { card: 0 });
      } else {
        checkButton.classList.add('active');
        this.currentCardIdx = currentCardIdx + 1;
        removeActiveAttributeOnClass(currentCardIdx, this.currentMode, '#checkbutton');
        !this.isHistoryModal() && handleEvent.fire('filterchange', { card: currentCardIdx + 1 });
      }
    }
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
        let isInitialChoicedButton = '';
        this.filter.card === idx + 1 ? (isInitialChoicedButton = 'active') : '';
        return `
            <div class='card ${objToChangeCardNameFromKoreanToEng[pay.payMethodName]}' id='card' data-idx=${idx}>
              <div class='card-price'>
                ${this.isHistoryModal() ? `` : `${pay.payMethodMoney}`}
              </div>

              <div class='card-check ${isInitialChoicedButton}' id='checkbutton'>
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
