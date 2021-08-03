import './Confirm.scss';
import { $, createDOMWithSelector } from '@src/utils/helper';

export default class ConfirmWindow {
  $confirm: HTMLDivElement | HTMLElement;
  addedText: string;
  onClickConfirmWindowHandler: EventListener;

  constructor({ onClickConfirmWindowHandler, addText }) {
    this.$confirm = createDOMWithSelector('div', '.confirm');
    this.addedText = addText;
    this.render();

    $('#root').appendChild(this.$confirm);
    this.onClickConfirmWindowHandler = onClickConfirmWindowHandler;

    this.$confirm.addEventListener('click', (e) => {
      this.onClickConfirmWindowHandler(e);
    });
  }

  render() {
    this.$confirm.innerHTML = `
        <div class="confirm__overlay"></div>
        ${this.createConfirmWindow()}
      
    `;
  }

  /**
   * addedText는 카드 삭제 시 추가 주의사항을 주기 위함입니다!
   */
  createConfirmWindow() {
    return `
        <div class="confirm__content">
            <span class="confirm__guide">정말로 삭제하시겠습니까?</span>
            <span class="confirm__add-text">${this.addedText}</span>
            <div class="confirm__check-one">
                <span class="confirm__cancel">취소</span><span class="confirm__delete">삭제</span>
            </div>
        </div>
      `;
  }
}
