import './Confirm.scss';
import { $, createDOMWithSelector } from '@src/utils/helper';

export default class ConfirmWindow {
  $confirm: HTMLDivElement | HTMLElement;
  addedText: string;
  onClick: EventListener;

  constructor({ onClick, addText }) {
    this.$confirm = createDOMWithSelector('div', '.confirm');
    this.addedText = addText;
    this.render();

    $('#root').appendChild(this.$confirm);
    this.onClick = onClick;

    this.$confirm.addEventListener('click', (e) => {
      this.onClick(e);
    });
  }

  render() {
    this.$confirm.innerHTML = `
        <div class="confirm__overlay"></div>
        ${this.createConfirmWindow()}
      
    `;
  }

  createConfirmWindow() {
    return `
        <div class="confirm__content">
            <span class="confirm__guide">정말로 삭제하시겠습니까?</span>
            <span class="confirm__add-text">${this.addedText}</span>
            <div class="confirm__checkOne">
                <span class="confirm__cancel">취소</span><span class="confirm__delete">삭제</span>
            </div>
        </div>
      `;
  }
}
