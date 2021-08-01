import { $, createDOMWithSelector, removeOthersClassList } from '@src/utils/helper';
import './AccountHistoryModal.scss';
import handleEvent from '@src/utils/handleEvent';
import { categoryList, matchCategoryAndImg } from '@src/static/constants';
import PayMethods from '@src/views/components/PayMethods/PayMethods';
import { samplePay } from '@src/dummyData';

const slideOutTime: number = 1300;
const dateInputMaxLength: number = 8;
const moneyInputMaxLength: number = 9;
const moneyInputMinLength: number = 0;
const alertShowTime: number = 2000;

/**
    추가적으로 고려할 부분 : 
    1.수입 지출!
    2.윤년 고려!
 */
export default class AccountHistoryModal {
  state: any;
  choicedCategoryIndex: number = 0;
  payMethod: any;
  modal: any;
  modalWrapper;
  dateInput;
  moneyInput;
  dateValueValidation: boolean = false;
  moneyValueValidation: boolean = false;
  choicedCategoryName: string = '';
  type: string = '';

  constructor() {
    handleEvent.subscribe('createhistorymodal', (e: CustomEvent) => {
      this.setState(e.detail); // undefined ( 애초에 가져올만한 정보는 결제수단목록뿐) !! 값 확인하기 !!

      this.modalWrapper = createDOMWithSelector('div', '.account-history-wrapper');
      this.render();

      const payMethodForm = $('.history-form__pay-method');
      this.dateInput = $('.history-form__date');
      this.moneyInput = $('.history-form__money');

      this.payMethod = new PayMethods({ parent: payMethodForm, state: samplePay }); // 결제수단의 정보 갖고있어야함!
      this.modalWrapper.addEventListener('click', this.onClickHandler.bind(this));
      this.modalWrapper.addEventListener('keyup', this.onKeyUpHandler.bind(this));
      this.dateInput.addEventListener('focusout', this.onFocusOutDateInputHandler.bind(this));
      this.moneyInput.addEventListener('focusout', this.onFocusOutMoneyInputHandler.bind(this));
      this.dateInput.addEventListener('focusin', this.onFocusInDateInputHandler.bind(this));
      this.moneyInput.addEventListener('focusin', this.onFocusInMoneyInputHandler.bind(this));
    });
  }

  onFocusInDateInputHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    this.checkInputValueOnlyNumberRegex(target);
  }

  onFocusInMoneyInputHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    this.checkInputValueOnlyNumberRegex(target);
  }

  onClickHandler(e: MouseEvent) {
    this.onClickCategory(e);
    this.onClickOverlay(e);
    this.onClickSubmitButton(e);
  }

  onClickSubmitButton(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'history-form__confirm') {
      e.preventDefault();
      this.checkAllValidation();
    }
  }

  checkAllValidation() {
    const historyContent: HTMLInputElement = document.querySelector('.history-form__content');

    if (
      this.payMethod.currentCardName.length > 0 &&
      this.dateValueValidation &&
      this.moneyValueValidation &&
      this.choicedCategoryName.length > 0 &&
      historyContent.value.length > 0
    ) {
      this.checkIncomeOrExpenditure();

      const submitArguments = {
        //   user:,
        card: this.payMethod.currentCardName,
        category: this.choicedCategoryName,
        money: this.moneyInput.value as HTMLInputElement,
        date: this.dateInput.value as HTMLInputElement,
        content: historyContent.value,
        type: this.type,
      };
      console.log('Form Success');

      this.closeModal();
      handleEvent.fire('createaccounthistory', { state: history.state, submitArguments });
      // 옵저버 발동
    } else {
      this.showAlert('.history-form__confirm-alert');
    }
  }

  checkIncomeOrExpenditure() {
    if (this.choicedCategoryName === '용돈') {
      this.type = 'income';
    } else {
      this.type = 'expenditure';
      this.moneyInput.value = '-' + this.moneyInput.value;
    }
  }
  onKeyUpHandler(e: KeyboardEvent) {
    this.onKeyUpDate(e);
    this.onKeyUpMoney(e);
  }

  onFocusOutDateInputHandler() {
    this.onFocusOutDate();
  }

  onFocusOutMoneyInputHandler() {
    this.onFocusOutMoney();
  }

  onFocusOutDate() {
    const target = $('.history-form__date');
    const ValidationLengthResult = this.checkDateInputLengthValidation(target, dateInputMaxLength);
    const ValidationValueResult = this.checkDateInputValueValidation(target);

    if (ValidationLengthResult || ValidationValueResult) {
      this.showAlert('.date-alert');
      this.dateValueValidation = false;
    } else {
      this.dateValueValidation = true;
    }
    this.formatDateValue();
  }

  formatDateValue() {
    const DateValue: string = this.dateInput.value;
    const DateArray = DateValue.split('');
    // 4, 7
    if (DateValue.length > 6) {
      DateArray.splice(4, 0, '.');
      DateArray.splice(7, 0, '.');
      this.dateInput.value = DateArray.join('');
    } else if (DateValue.length > 4) {
      DateArray.splice(4, 0, '.');
      this.dateInput.value = DateArray.join('');
    }
  }

  onFocusOutMoney() {
    const target = $('.history-form__money');
    const ValidationResult = this.checkMoneyInputLengthValidation(target, moneyInputMinLength);

    if (ValidationResult) {
      this.showAlert('.money-alert');
      this.moneyValueValidation = false;
    } else {
      this.moneyValueValidation = true;
    }
    this.formatMoneyValue();
  }

  formatMoneyValue() {
    const MoneyValue: string = this.moneyInput.value;
    const MoneyArray = MoneyValue.split('');
    const MoneyLength = MoneyValue.length;

    if (MoneyLength > 3) {
      let count = 1;
      for (let i = MoneyLength - 1; i > 0; i--) {
        if (count % 3 === 0) {
          MoneyArray.splice(i, 0, ',');
        }
        count++;
      }
    }

    const result = MoneyArray.join('');
    this.moneyInput.value = result;
  }

  showAlert(target) {
    $(target).classList.add('active');
    setTimeout(() => {
      $(target).classList.remove('active');
    }, alertShowTime);
  }

  checkDateInputLengthValidation(target, length) {
    if (target.value.length !== length) return true;
    return false;
  }

  checkDateInputValueValidation(target) {
    const month = target.value.slice(4, 6);
    const day = target.value.slice(6, 8);
    if (0 < Number(month) && 13 > Number(month) && 31 > Number(day) && 0 < Number(day)) return false;
    return true;
  }

  checkMoneyInputLengthValidation(target, length) {
    if (target.value.length === length) return true;
    return false;
  }

  onKeyUpDate(e: KeyboardEvent) {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.className === 'history-form__date') {
      this.checkRegex(target, dateInputMaxLength);
    }
  }

  onKeyUpMoney(e: KeyboardEvent) {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.className === 'history-form__money') {
      this.checkRegex(target, moneyInputMaxLength);
    }
  }

  checkRegex(target, InputMaxLength) {
    this.checkInputValueOnlyNumberRegex(target);
    this.checkInputMaxLengthRegex(target, InputMaxLength);
  }

  checkInputValueOnlyNumberRegex(target) {
    const regex = /[^0-9|]/g;
    target.value = target.value.replace(regex, '');
  }

  checkInputMaxLengthRegex(target, maxLength) {
    target.value = target.value.slice(0, maxLength);
  }

  /**
     overlay 이벤트 구현
     overlay는 모달 밖 검은색 배경을 의미한다.
     - 클릭시 애니메이션 활성화 및 removeChild
   */
  onClickOverlay(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'overlay') {
      this.closeModal();
    }
  }

  closeModal() {
    $('.history-form').classList.add('hide');
    setTimeout(() => {
      $('#root').removeChild(this.modalWrapper);
    }, slideOutTime);
  }

  onClickCategory(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'category-item') {
      const allCategoryElement = document.querySelectorAll('#category-outline');
      const currentItemIndex = Number(target.dataset.idx);
      const targetElement = allCategoryElement[currentItemIndex];

      if (targetElement.classList.contains('active')) {
        targetElement.classList.remove('active');
        this.choicedCategoryName = '';
      } else {
        targetElement.classList.add('active');
        this.choicedCategoryName = target.innerText;
        removeOthersClassList(currentItemIndex, document, '#category-outline');
      }
    }
  }

  setState(state): void {
    this.state = state;
  }

  render(): void {
    this.modalWrapper.innerHTML = this.createModal();
    $('#root').appendChild(this.modalWrapper);
  }

  createModal() {
    return `
        <div class="account-history-modal">
            <div class="overlay"></div>
            ${this.createForm()}
        </div>
      `;
  }

  createForm() {
    return `
      <div class="history-form">
        <form>
            <div class="history-form__date-money-container">
                ${this.createDateForm()}
                ${this.createMoneyForm()}
            </div>
            <div class="history-form__content-container">
                ${this.createContentForm()}
            </div>
            ${this.createPayMethodForm()}
            ${this.createCategoryForm()}
            ${this.createConfirmButton()}
        </form> 
      </div>
    `;
  }

  createDateForm() {
    return `
     <div class="history-form__date-container">
        <span>일자</span>
        <input placeholder='ex> 20210101' class="history-form__date" type="text" />
        <span class='date-alert'>유효한 날짜를 입력해주시기 바랍니다❗️</span>
    </div>
    `;
  }

  createMoneyForm() {
    return `
      <div class="history-form__money-container">
        <span>금액</span>
        <input class="history-form__money" type="text" />
        <span class='Won'>₩</span>
        <span class='money-alert'>금액를 입력해주시기 바랍니다❗️</span>
      </div>
      `;
  }

  createContentForm() {
    return `
        <span>내용</span>
        <input class="history-form__content" type="text" maxlength='18' />
    `;
  }

  createPayMethodForm() {
    return `
        <div class="history-form__pay-method"></div>
    `;
  }

  createCategoryForm() {
    return `
      <div class="history-form__category">
        <span>분류</span>
        <div class="history-form__category-container">
            ${this.createCategoryList()}
        </div>
      </div>
    `;
  }

  createCategoryList() {
    return categoryList
      .map((category, idx) => {
        return `
            <div class="history-form__category-list" id='category-outline'>
                <img src=${matchCategoryAndImg[category]}>
                <span id='category-item' data-idx=${idx} >${category}</span>
            </div>
        `;
      })
      .join('');
  }

  createConfirmButton() {
    return `
        <div class="history-form__confirm-container" >
            <button class="history-form__confirm" >등록하기</button>
            <span class='history-form__confirm-alert'>❗️모든 값을 제대로 입력해주셔야 합니다❗️</span>
        </div>
      `;
  }
}
