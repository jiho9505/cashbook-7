import ResultMessage from '@src/views/components/ResultMessage/ResultMessage';
import { $, createDOMWithSelector } from '@src/utils/helper';
import handleEvent from '@src/utils/handleEvent';
import { matchCategoryAndImg, categoryList } from '@src/static/constants';
import { CheckActive, CheckNonActive, TrashCan } from '@src/static/image-urls';

import './AccountHistory.scss';
import ConfirmWindow from '@src/views/components/Confirm/Confirm';

export default class AccountHistory {
  state: any;
  history: HTMLElement;

  isIncomeButtonActive: boolean = true;
  isExpenditureButtonActive: boolean = true;
  isIncomeButtonSrc = CheckActive;
  isExpenditureButtonSrc = CheckActive;

  filter;
  prevChoicedCategoryId;
  prevChoicedCategoryName: string = '';
  prevChoicedDay: any = '';

  constructor({ parent, state, filter }) {
    this.history = createDOMWithSelector('div', '.account-history');

    parent.appendChild(this.history);
    this.setProperty(state, filter);
    this.render();

    this.history.addEventListener('click', this.onClickHandler.bind(this));
    this.history.addEventListener('focusout', this.onFoucsOutHandler.bind(this));
    $('#root').addEventListener('click', this.onClickModalHandler.bind(this));
  }

  setProperty(state, filter): void {
    this.state = state;
    this.filter = filter;
    this.prevChoicedDay = filter.day;
    this.prevChoicedCategoryId = filter.category;
  }

  render(): void {
    $('.account-history').innerHTML = `
        ${this.createHistoryHeader()}
        ${this.createHistoryContent()}
        `;
  }

  /**
   * 생각해볼만한것 ---
   * focusout읋 할때 전체를 클릭하면 focusout 먼저, 그 후 전체 클릭이벤트 발동.
   * 즉 동작에 문제 없음
   */
  onFoucsOutHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'date__input') {
      const dateInput: HTMLInputElement = target as HTMLInputElement;
      let day = dateInput.value;
      if (day.length === 1) day = '0' + day;
      handleEvent.fire('filterchange', { day });
    }
  }

  onClickHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    this.onClickAddButton(target);
    this.onClickCategoryItem(target);
    this.onClickDateButton(target);
    this.onClickTypeButton(target);
    this.onClickTrashCanImage(target);
    this.onClickCategoryName(target);
    this.onClickDateName(target);
  }

  onClickModalHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    this.onClickExceptCategoryArea(target);
    this.onClickExceptDateArea(target);
  }

  /**
   * TODO:
   * 이거 추후에 모달 컴포넌트로 만들게요.. 예외처리가 너무 많네요 ㅠㅠ
   */
  onClickExceptCategoryArea(target) {
    if (
      target.className !== 'category-container active' &&
      target.className !== 'account-history-table__category-span'
    ) {
      $('.category-container').classList.remove('active');
    }
  }

  /**
   * TODO:
   * 이거 추후에 모달 컴포넌트로 만들게요.. 예외처리가 너무 많네요 ㅠㅠ
   */
  onClickExceptDateArea(target) {
    if (
      ![
        'date-container active',
        'account-history-table__date-span',
        'date__specific-part',
        'date__input-container active',
        'date__specific',
        'date__whole',
        'date__fix-date',
        'date__input-container active',
        'date__input',
      ].includes(target.className)
    ) {
      $('.date-container').classList.remove('active');
    }
  }

  onClickCategoryName(target) {
    if (target.className === 'account-history-table__category-span') {
      $('.category-container').classList.contains('active')
        ? $('.category-container').classList.remove('active')
        : $('.category-container').classList.add('active');
    }
  }

  onClickDateName(target) {
    if (target.className === 'account-history-table__date-span') {
      $('.date-container').classList.add('active');
    }
  }

  onClickTrashCanImage(target) {
    if (target.className === 'account-history-table__trashcan') {
      new ConfirmWindow({
        onClickConfirmWindowHandler: (e) => this.onClickConfirmWindowHandler(e, target.dataset.id),

        addText: '',
      });
    }
  }

  onClickConfirmWindowHandler(e: MouseEvent, targetId) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    if (target.className === 'confirm__overlay' || target.className === 'confirm__cancel') {
      $('#root').removeChild($('.confirm'));
    } else if (target.className === 'confirm__delete') {
      $('#root').removeChild($('.confirm'));
      new ResultMessage('삭제가 완료되었습니다.');
      handleEvent.fire('deleteaboutaccount', { id: targetId });
    }
  }

  onClickTypeButton(target) {
    const incomeType: HTMLImageElement = $('.account-history__income-img') as HTMLImageElement;
    const expenditureType: HTMLImageElement = $('.account-history__expenditure-img') as HTMLImageElement;
    if (target.className === 'account-history__income-img') {
      if (incomeType.src === CheckActive) {
        incomeType.src = CheckNonActive;
        this.isIncomeButtonActive = false;
      } else {
        incomeType.src = CheckActive;
        this.isIncomeButtonActive = true;
      }
      const type = this.getType();
      handleEvent.fire('filterchange', { type });
    } else if (target.className === 'account-history__expenditure-img') {
      if (expenditureType.src === CheckActive) {
        expenditureType.src = CheckNonActive;
        this.isExpenditureButtonActive = false;
      } else {
        expenditureType.src = CheckActive;
        this.isExpenditureButtonActive = true;
      }
      const type = this.getType();
      handleEvent.fire('filterchange', { type });
    }
  }

  getType() {
    if (this.isIncomeButtonActive && this.isExpenditureButtonActive) return '';
    else if (this.isIncomeButtonActive) return 'income';
    else if (this.isExpenditureButtonActive) return 'expenditure';
    else return 'not-choice';
  }

  onClickCategoryItem(target) {
    if (target.className === 'category-list-img') {
      if (this.prevChoicedCategoryId === Number(target.dataset.id)) {
        handleEvent.fire('filterchange', { category: 0 });
        return;
      }
      handleEvent.fire('filterchange', { category: Number(target.dataset.id) });
    }
  }

  onClickDateButton(target) {
    this.onClickWholeDateButton(target);
    this.onClickSpecificDateButton(target);
  }

  onClickWholeDateButton(target) {
    if (target.className === 'date__whole-part') {
      handleEvent.fire('filterchange', { day: '' });
    }
  }

  /**
   * 특정한 날짜로 리렌더링되면 특정날짜버튼이 default가 되게 해야할듯.. 흠
   */
  onClickSpecificDateButton(target) {
    if (target.className === 'date__specific-part') {
      this.changeButtonImage();
      $('.date__input-container').classList.add('active');
      const input = $('.date__input') as HTMLInputElement;
      input.focus();
    }
  }

  changeButtonImage() {
    const wholeDateButtonImage: HTMLImageElement = document.querySelector('#whole-date-img');
    const SpecificDateButtonImage: HTMLImageElement = document.querySelector('#specific-date-img');

    wholeDateButtonImage.src = CheckNonActive;
    SpecificDateButtonImage.src = CheckActive;
  }

  onClickAddButton(target) {
    if (target.className === 'account-history__add')
      handleEvent.fire('createhistorymodal', { userId: this.state.detail[0].userId });
  }

  createHistoryHeader(): string {
    this.checkTypeToChangeSrc();

    return `
      <div class='account-history__header'>
        <div class='account-history__header-left'>
          <span class='account-history__text'>내역</span>
          <span class='account-history__add'>+</span>
        </div>
        <div class='account-history__header-right'>
          <div class='account-history__income'>
            <img class='account-history__income-img' src= ${this.isIncomeButtonSrc}>
            <span>수입 ${this.state.income}</span>
          </div>
          <div class='account-history__expenditure'>
            <img class='account-history__expenditure-img' src= ${this.isExpenditureButtonSrc}>
            <span >지출 ${this.state.expenditure}</span>
          </div>
          
        </div>
      </div>`;
  }

  checkTypeToChangeSrc() {
    if (this.filter.type === 'income') {
      this.isIncomeButtonSrc = CheckActive;
      this.isExpenditureButtonSrc = CheckNonActive;
      this.isIncomeButtonActive = true;
      this.isExpenditureButtonActive = false;
    } else if (this.filter.type === 'expenditure') {
      this.isIncomeButtonSrc = CheckNonActive;
      this.isExpenditureButtonSrc = CheckActive;
      this.isIncomeButtonActive = false;
      this.isExpenditureButtonActive = true;
    } else if (this.filter.type === '') {
      this.isIncomeButtonSrc = CheckActive;
      this.isExpenditureButtonSrc = CheckActive;
      this.isIncomeButtonActive = true;
      this.isExpenditureButtonActive = true;
    } else if (this.filter.type === 'not-choice') {
      this.isIncomeButtonSrc = CheckNonActive;
      this.isExpenditureButtonSrc = CheckNonActive;
      this.isIncomeButtonActive = false;
      this.isExpenditureButtonActive = false;
    }
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
        <tr class='account-history-table__header'>
          <th class='account-history-table__content'>거래 내용</th>
          <th class='account-history-table__category'><span class='account-history-table__category-span'>카테고리</span>${this.createCategoryChoiceBar()}</th>
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
    let wholeDateSrc = '';
    if (this.prevChoicedDay === '') {
      wholeDateSrc = CheckActive;
    } else {
      wholeDateSrc = CheckNonActive;
    }

    return `
      <div class="date__whole">
        <img class="date__whole-part" id='whole-date-img' src=${wholeDateSrc}>
        <span class="date__whole-part">전체</span>
      </div>`;
  }

  createSpecificDateChoice(): string {
    let specificDateSrc = '';
    let AddedInputClassName = '';
    let initInputValue = '';
    if (this.prevChoicedDay === '') {
      specificDateSrc = CheckNonActive;
    } else {
      specificDateSrc = CheckActive;
      AddedInputClassName = 'active';
      initInputValue = this.prevChoicedDay;
    }

    return `
      <div class="date__specific">
        <div class="date__specific-container">
          <img class="date__specific-part"  id='specific-date-img' src=${specificDateSrc}>
          <span class="date__specific-part">특정 날짜 선택</span>
        </div>

        <div class="date__input-container ${AddedInputClassName}">
          ${this.createFixedDate()}
          <input class="date__input" type='text' maxlength=2 value=${initInputValue}>
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
        let AddedCategoryClassName: string = '';
        if (this.prevChoicedCategoryId === idx + 1) {
          AddedCategoryClassName = 'active';
        }
        return `
            <div class="category-list ${AddedCategoryClassName}">
                <img class="category-list-img" src=${matchCategoryAndImg[category]} data-id=${idx + 1}>
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
                            <span class='account-history-table__content-span'>${item.content}</span>
                            <span class='account-history-table__content-pay'>${item.payMethod}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class='account-history-table__content-category'>${item.category}</span>
                </td>
                <td>
                    <span class='account-history-table__content-createdAt'>${item.createdAt}</span>
                </td>
                <td>
                    <span class='account-history-table__content-price'>${item.price}</span>
                </td>
                <td>
                    <img class='account-history-table__trashcan' src=${TrashCan} data-id=${item.id}></img>

                </td>
            </tr>
        `;
      })
      .join('');
  }
}
