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

  createCard(): string {
    return this.payMethods
      .map((payMethod, idx) => {
        console.log(cardType[payMethod]);
        return `
        <div class='account__card ${cardType[payMethod]}'>
          <div class='account__card-price'>
            10,000원
          </div>
          
          <div class='account__card-check active'>
            <img src=${CheckButton}>
          </div>
          <div class='account__card-option'>
            <img src=${Option}>
          </div>
          <div class='account__card-name'>
            ${payMethod}
          </div>
        </div>
      `;
      })
      .join('');
  }

  createMyBalance(): string {
    return `
      <div class='account__balance-container'>
        <span class='account__balance-text'>현재 잔고</span>
        <span class='account__balance'>${this.balance}</span>  
      </div>
    `;
  }

  createHistoryHeader(): string {
    return `
      <div class='history__header'>
        <div class='history__header-left'>
          <span class='history__text'>내역</span>
          <span class='history__add'>+</span>
        </div>
        <div class='history__header-right'>
          <span>수입</span>  
          <span>${this.income}</span>
          <span>지출</span>
          <span>${this.expenditure}</span>
        </div>
      </div>`;
  }

  createHistoryContent(): string {
    return `
      <table class='table'>
        ${this.createTableHeader()}
        ${this.createTableContent()}
      </table>`;
  }

  createTableHeader(): string {
    return `
      <thead>
        <tr class='table__header' align='left'>
          <th class='table__content'>거래내용</th>
          <th class='table__category'>카테고리</th>
          <th class='table__date'>날짜</th>
          <th class='table__price'>금액</th>
        </tr>
      </thead>`;
  }
}
