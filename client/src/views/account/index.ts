import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';
import {
  Health,
  Transport,
  Food,
  Culture,
  Others,
  Shopping,
  DailyLife,
  CheckButton,
  Option,
} from '@src/static/imageUrls';
import '@src/views/account/index.scss';
import { cardType } from '@src/static/constants';

export default class AccountView {
  income: string = '1,822,470원';
  expenditure: string = '9,500원';
  balance: string = '363,000원';
  payMethods: string[] = ['카카오뱅크', '신한카드', '현금', '우리카드', '롯데카드', '삼성카드', '현대카드', 'anything'];
  // 아직 타입은 확정X
  // price / createdAt / category / paymethod / content ( 테이블에서 이정도 추가 필요  : 상세내역 부분임 )

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;

      this.render();
    });
  }

  render(): void {
    $('.content-wrap').innerHTML = `
      <div class='account'>
        ${this.createMyBalance()}
        ${this.createPayMethod()}

        <div class='history'>
          ${this.createHistoryHeader()}
          ${this.createHistoryContent()}   
        </div>
      </div>`;
  }

  createPayMethod(): string {
    return `
      <div>
        <div class='account__pay-container'>
          <span class='account__pay-text'>결제수단</span>
          <span class='account__pay'>+</span>
        </div>
        
        <div class='account__card-container'>
          ${this.createCard()}
        </div>
      </div>`;
  }
}
