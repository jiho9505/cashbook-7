import { $, createDOMWithSelector, removeActiveAttributeOnClass } from '@src/utils/helper';
import handleEvent from '@src/utils/handleEvent';
import {
  categoryList,
  objToChangeCardEnglishNameToNum,
  objToChangeCardNameFromKoreanToEng,
  objToChangeCategoryEnglishNameToNum,
  objToChangeCategoryNameFromKoreanToEng,
  matchCategoryAndImg,
  CardsForModal,
} from '@src/static/constants';
import PayMethods from '@src/views/components/PayMethods/PayMethods';
import ResultMessage from '@src/views/components/ResultMessage/ResultMessage';
import './AccountHistoryModal.scss';

const slideOutTime: number = 1300;
const dateInputMaxLength: number = 8;
const moneyInputMaxLength: number = 9;
const moneyInputMinLength: number = 0;
const alertShowTime: number = 2000;

/**
    TODO:
    추가적으로 고려할 부분 : 
    -윤년 고려!
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
      this.modalWrapper = createDOMWithSelector('div', '.account-history-wrapper');
      this.render();

      const payMethodForm = $('.history-form__pay-method');

      this.dateInput = $('.history-form__date');
      this.moneyInput = $('.history-form__money');
      this.payMethod = new PayMethods({ parent: payMethodForm, state: CardsForModal, filter: {} });
      this.modalWrapper.addEventListener('click', this.onClickHandler.bind(this));
      this.modalWrapper.addEventListener('keyup', this.onKeyUpHandler.bind(this));
      this.modalWrapper.addEventListener('focusout', this.onFocusOutInputHandler.bind(this));
      this.modalWrapper.addEventListener('focusin', this.onFocusInInputHandler.bind(this));
    });
  }

  render(): void {
    this.modalWrapper.innerHTML = this.createModal();
    $('#root').appendChild(this.modalWrapper);
  }

  onClickHandler(e: MouseEvent) {
    this.onClickCategory(e);
    this.onClickOverlay(e);
    this.onClickSubmitButton(e);
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

  onClickCategory(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'category-item') {
      const allCategoryElement = document.querySelectorAll('.history-form__category-list');
      const currentItemIndex = Number(target.dataset.idx);
      const targetElement = allCategoryElement[currentItemIndex];

      if (targetElement.classList.contains('active')) {
        targetElement.classList.remove('active');
        this.choicedCategoryName = '';
      } else {
        targetElement.classList.add('active');
        this.choicedCategoryName = target.innerText;
        removeActiveAttributeOnClass(currentItemIndex, document, '.history-form__category-list');
      }
    }
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
      this.payMethod.currentCardIdx > 0 &&
      this.dateValueValidation &&
      this.moneyValueValidation &&
      this.choicedCategoryName.length > 0 &&
      historyContent.value.length > 0
    ) {
      this.checkIncomeOrExpenditure();

      const categoryEnglishName = objToChangeCategoryNameFromKoreanToEng[this.choicedCategoryName];
      const categoryIndex = objToChangeCategoryEnglishNameToNum[categoryEnglishName];

      const date = this.changeSign(this.dateInput.value);
      const price = this.changeToNum(this.moneyInput.value);

      const submitArguments = {
        payMethodId: this.payMethod.currentCardIdx,
        categoryId: categoryIndex + 1,
        price,
        expenditureDay: date,
        historyContent: historyContent.value,
        type: this.type,
      };

      this.closeModal();
      new ResultMessage('내역이 추가되었습니다❗️');
      handleEvent.fire('createaccounthistory', { state: history.state, submitArguments });
    } else {
      this.showAlert('.history-form__confirm-alert');
    }
  }

  /**
   * DB에 넣기 적절한 부호로 바꾸는 함수입니다.
   * ex> 2021.03.21 -> 2021-03-21
   */
  changeSign(value) {
    const newValue = value.replace(/[.]/g, '-');
    return newValue;
  }

  checkIncomeOrExpenditure() {
    if (this.choicedCategoryName === '수입') {
      this.type = 'income';
    } else {
      this.type = 'expenditure';
      this.moneyInput.value = '-' + this.moneyInput.value;
    }
  }

  onFocusOutInputHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'history-form__date') this.onFocusOutDateInputHandler();
    else if (target.className === 'history-form__money') this.onFocusOutMoneyInputHandler();
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
    const DateValue = this.dateInput.value;
    const DateArray = DateValue.split('');
    const firstIndexToPutDot = 4;
    const secondIndexToPutDot = 6;

    if (DateValue.length > secondIndexToPutDot) {
      DateArray.splice(firstIndexToPutDot, 0, '.');
      DateArray.splice(secondIndexToPutDot + 1, 0, '.');
      this.dateInput.value = DateArray.join('');
    } else if (DateValue.length > firstIndexToPutDot) {
      DateArray.splice(firstIndexToPutDot, 0, '.');
      this.dateInput.value = DateArray.join('');
    }
  }

  onFocusOutMoney() {
    const target = $('.history-form__money');
    const isResultValid = this.checkMoneyInputLengthValidation(target, moneyInputMinLength);

    if (isResultValid) {
      this.showAlert('.money-alert');
      this.moneyValueValidation = false;
    } else {
      this.moneyValueValidation = true;
    }
    this.formatMoneyValue();
  }

  formatMoneyValue() {
    const moneyValue: string = this.moneyInput.value;
    const moneyArray = moneyValue.split('');
    const moneyLength = moneyValue.length;

    if (moneyLength > 3) {
      let count = 1;
      for (let i = moneyLength - 1; i > 0; i--) {
        if (count % 3 === 0) {
          moneyArray.splice(i, 0, ',');
        }
        count++;
      }
    }

    const result = moneyArray.join('');
    this.moneyInput.value = result;
  }

  showAlert(targetClassName) {
    $(targetClassName).classList.add('active');
    setTimeout(() => {
      $(targetClassName).classList.remove('active');
    }, alertShowTime);
  }

  onFocusInInputHandler(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.className === 'history-form__date' || target.className === 'history-form__money')
      this.checkInputValueOnlyNumberRegex(target);
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

  checkRegex(target, InputMaxLength) {
    this.checkInputValueOnlyNumberRegex(target);
    this.checkInputMaxLengthRegex(target, InputMaxLength);
  }

  checkInputValueOnlyNumberRegex(target) {
    const regex = /[^0-9|]/g;
    target.value = target.value.replace(regex, '');
  }

  changeToNum(value) {
    const regex = /[^0-9|]/g;
    return value.replace(regex, '');
  }

  checkInputMaxLengthRegex(target, maxLength) {
    target.value = target.value.slice(0, maxLength);
  }

  onKeyUpHandler(e: KeyboardEvent) {
    this.onKeyUpDate(e);
    this.onKeyUpMoney(e);
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

  closeModal() {
    $('.history-form').classList.add('hide');
    setTimeout(() => {
      $('#root').removeChild(this.modalWrapper);
    }, slideOutTime);
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
            <div class="history-form__category-list">
                <img  src=${matchCategoryAndImg[category]}>
                <span class='category-item' data-idx=${idx} >${category}</span>
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
