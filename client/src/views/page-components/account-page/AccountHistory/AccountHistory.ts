import { $, createDOMWithSelector } from '@src/utils/helper';
import handleEvent from '@src/utils/handleEvent';
<<<<<<< HEAD:client/src/views/page-components/account-page/AccountHistory/AccountHistory.ts
import { matchCategoryAndImg } from '@src/static/constants';
<<<<<<< HEAD:client/src/views/page-components/account-page/AccountHistory/AccountHistory.ts
import './AccountHistory.scss';
import { CheckActive, CheckNonActive } from '@src/static/image-urls';
=======
=======
import { matchCategoryAndImg, categoryList } from '@src/static/constants';
>>>>>>> 3c88c2a ([#16] feat : Category Bar 구현):client/src/views/page-components/account/AccountHistory/AccountHistory.ts
import { CheckActive, CheckNonActive } from '@src/static/imageUrls';
>>>>>>> d8dc6f7 ([#16] feat : AddButton Click 이벤트 추가):client/src/views/page-components/account/AccountHistory/AccountHistory.ts

import './AccountHistory.scss';

export default class AccountHistory {
  state: any;
  history: HTMLElement;

  constructor({ parent, state }) {
    this.history = createDOMWithSelector('div', '.account-history');

    parent.appendChild(this.history);
    this.setProperty(state);
    this.render();

    this.history.addEventListener('click', this.onClickHandler.bind(this));
    this.history.addEventListener('mouseover', this.onMouseOverHandler.bind(this));
    // this.history.addEventListener('mouseout', this.onMouseOutHandler.bind(this));
    this.history.addEventListener('focusout', this.onFoucsOutHandler.bind(this));
  }

  /**
   * 생각해볼만한것 ---
   * focusout읋 할때 전체를 클릭하면 focusout 먼저, 그 후 전체 클릭이벤트 발동.
   * 즉 동작에 문제 없음
   * TODO:
   * 현재 년,월 기준으로 날짜를 입력할때 유효성검사!
   * 이상한 날짜 입력하면 border를 빨간색으로 흔들어주자!
   */
  onFoucsOutHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'date__input') {
      console.log('filter Change - input');
      // handleEvent.fire('changefilter');
    }
  }

  /**
   * 전체에 이벤트를 거니 마우스 움직일때마다 검사하는게 성능에 괜찮은지 궁금하네요!
   */
  onMouseOverHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'account-history-table__category-span') {
      $('.category-container').classList.add('active');
    } else if (target.className === 'account-history-table__date-span') {
      $('.date-container').classList.add('active');
    }
  }

  // 조언을 구해보자..!
  // onMouseOutHandler(e: MouseEvent) {
  //   console.log(target.closest('.category-container'));
  //   if (target.closest('.account-history-table__category')) {
  //     $('.category-container').classList.remove('active');
  //   } else if (target.className === 'date-container active') {
  //     $('.date-container').classList.remove('active');
  //   }
  // }

  onClickHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    this.onClickAddButton(target);
    this.onClickCategoryItem(target);
    this.onClickDateButton(target);
    this.onClickTypeButton(target);
  }

  /**
   * TODO:
   * type button도 필터 후 default 설정 필요
   */
  onClickTypeButton(target) {
    const incomeType: HTMLImageElement = $('.account-history__income-img') as HTMLImageElement;
    const expenditureType: HTMLImageElement = $('.account-history__expenditure-img') as HTMLImageElement;
    if (target.className === 'account-history__income-img') {
      incomeType.src === CheckActive ? (incomeType.src = CheckNonActive) : (incomeType.src = CheckActive);
      console.log('filter change - income');
    } else if (target.className === 'account-history__expenditure-img') {
      expenditureType.src === CheckActive
        ? (expenditureType.src = CheckNonActive)
        : (expenditureType.src = CheckActive);
      console.log('filter change - expenditure');
    }
  }

  onClickCategoryItem(target) {
    if (target.className === 'category-list-img') console.log('item Click');
    // handleEvent.fire('changefilter');
  }

  onClickDateButton(target) {
    this.onClickWholeDateButton(target);
    this.onClickSpecificDateButton(target);
  }

  onClickWholeDateButton(target) {
    if (target.className === 'date__whole-part') {
      this.changeButtonImage('whole');
      $('.date__input-container').classList.remove('active');
      console.log('filter Change - whole data');
      // handleEvent.fire('changefilter');
    }
  }

  /**
   * 특정한 날짜로 리렌더링되면 특정날짜버튼이 default가 되게 해야할듯.. 흠
   */
  onClickSpecificDateButton(target) {
    if (target.className === 'date__specific-part') {
      this.changeButtonImage('specific');
      $('.date__input-container').classList.add('active');
      const input = $('.date__input') as HTMLInputElement;
      input.focus();
    }
  }

  changeButtonImage(mode: string) {
    const wholeDateButtonImage: HTMLImageElement = document.querySelector('#whole-date-img');
    const SpecificDateButtonImage: HTMLImageElement = document.querySelector('#specific-date-img');

    if (mode === 'whole') {
      wholeDateButtonImage.src = CheckActive;
      SpecificDateButtonImage.src = CheckNonActive;
    } else if (mode === 'specific') {
      wholeDateButtonImage.src = CheckNonActive;
      SpecificDateButtonImage.src = CheckActive;
    }
  }

  onClickAddButton(target) {
    if (target.className === 'account-history__add') handleEvent.fire('createhistorymodal'); // 자신의 결제수단 데이터를 넘겨줄것 state는 없어도 됨
  }

  setProperty(state): void {
    this.state = state;
  }

  render(): void {
    $('.account-history').innerHTML = `
        ${this.createHistoryHeader()}
        ${this.createHistoryContent()}
        `;
  }

  createHistoryHeader(): string {
    return `
      <div class='account-history__header'>
        <div class='account-history__header-left'>
          <span class='account-history__text'>내역</span>
          <span class='account-history__add'>+</span>
        </div>
        <div class='account-history__header-right'>
          <div class='account-history__income'>
            <img class='account-history__income-img' src= ${CheckActive}>
            <span>수입 ${this.state.income}</span>
          </div>
          <div class='account-history__expenditure'>
            <img class='account-history__expenditure-img' src= ${CheckActive}>
            <span >지출 ${this.state.expenditure}</span>
          </div>
          
        </div>
      </div>`;
  }

  createHistoryContent(): string {
    return `
      <table class='account-history-table'>
        ${this.createTableHeader()}
        ${this.createTableContent()}
      </table>`;
  }

  createTableHeader(): string {
    return `
      <thead>
        <tr class='account-history-table__header' align='left'>
          <th class='account-history-table__content'>거래내용</th>
          <th class='account-history-table__category'><span class='account-history-table__category-span'>분류</span>${this.createCategoryChoiceBar()}</th>
          <th class='account-history-table__date'><span class='account-history-table__date-span'>날짜</span>${this.createDateChoiceBar()}</th>
          <th class='account-history-table__price'>금액</th>
        </tr>
      </thead>`;
  }

  createDateChoiceBar(): string {
    return `
      <div class="date-container">
        ${this.createWholeDateChoice()}
        ${this.createSpecificDateChoice()}
        <div>
        </div>
      </div>
    `;
  }

  createWholeDateChoice(): string {
    return `
      <div class="date__whole">
        <img class="date__whole-part" id='whole-date-img' src=${CheckActive}>
        <span class="date__whole-part">전체</span>
      </div>`;
  }

  createSpecificDateChoice(): string {
    return `
      <div class="date__specific">
        <img class="date__specific-part"  id='specific-date-img' src=${CheckNonActive}>
        <span class="date__specific-part">특정 날짜 선택</span>
        <div class="date__input-container">
          ${this.createFixedDate()}
          <input class="date__input" type='text' maxlength=2>
        </div>
      </div>
    `;
  }

  /**
   * 현재 년,월에 맞는 고정 Date를 보여준다
   */
  createFixedDate(): string {
    return `
      <span class="date__fix-date">${history.state.year}.${this.zeroFill()}${history.state.month}.</span>
    `;
  }

  zeroFill(): string {
    if (history.state.month < 10) {
      return `0`;
    }
  }

  createCategoryChoiceBar(): string {
    return `
      <div class="category-container">
       ${this.createCategoryList()}
      </div>
    `;
  }

  createCategoryList() {
    return categoryList
      .map((category, idx) => {
        return `
            <div class="category-list">
                <img class="category-list-img" src=${matchCategoryAndImg[category]}>
            </div>
        `;
      })
      .join('');
  }

  createTableContent(): string {
    return `
      <tbody>
        ${this.createContentDetail()}
      </tbody>`;
  }

  createContentDetail() {
    return this.state.detail
      .map((item) => {
        const image = matchCategoryAndImg[item.category];
        return `
            <tr class='account-history-table_row'>
                <td>
                    <div class='account-history-table__content-container'>
                        <img src=${image}>
                        <div class='account-history-table__content-detail'>
                            <span>${item.content}</span>
                            <span class='account-history-table__content-pay'>${item.payMethod}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span>${item.category}</span>
                </td>
                <td>
                    <span>${item.createdAt}</span>
                </td>
                <td>
                    <span>${item.price}</span>
                </td>
            </tr>
        `;
      })
      .join('');
  }
}
