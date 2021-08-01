import { $, createDOMWithSelector, removeOthersClassList } from '@src/utils/helper';
import './AccountHistoryModal.scss';
import handleEvent from '@src/utils/handleEvent';
import { categoryList, matchCategoryAndImg } from '@src/static/constants';
import PayMethods from '@src/views/components/PayMethods/PayMethods';
import { samplePay } from '@src/dummyData';

const SlideOutTime: number = 1300;
const DateInputMaxLength: number = 8;
const MoneyInputMaxLength: number = 9;

export default class AccountHistoryModal {
  state: any;
  choicedCategoryIndex: number = 0;
  payme: any;
  modal: any;
  modalWrapper;
  constructor() {
    handleEvent.subscribe('createhistorymodal', (e: CustomEvent) => {
      this.setState(e.detail.store);

      this.modalWrapper = createDOMWithSelector('div', '.account-history-wrapper');
      this.render();

      const payMethodForm = $('.history-form__pay-method');
      this.payme = new PayMethods({ parent: payMethodForm, state: samplePay }); // 결제수단의 정보 갖고있어야함!
      this.modalWrapper.addEventListener('click', this.onClickHandler.bind(this));
      this.modalWrapper.addEventListener('keyup', this.onKeyUpHandler.bind(this));
      // modal.addEventListener('focusout', this.focusoutEventHandler.bind(this))
    });
  }

  onClickHandler(e: MouseEvent) {
    this.onClickCategory(e);
    //   this.onClickPayMethod()
    //   this.onClickSubmit()
    this.onClickOverlay(e);
  }

  onKeyUpHandler(e: KeyboardEvent) {
    this.onKeyUpDate(e);
    this.onKeyUpMoney(e);
  }

  onKeyUpDate(e: KeyboardEvent) {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.className === 'history-form__date') {
      this.checkRegex(target, DateInputMaxLength);
    }
  }

  onKeyUpMoney(e: KeyboardEvent) {
    const { target } = e;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.className === 'history-form__money') {
      this.checkRegex(target, MoneyInputMaxLength);
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
      $('.history-form').classList.add('hide');
      setTimeout(() => {
        $('#root').removeChild(this.modalWrapper);
      }, SlideOutTime);
    }
  }

  onClickCategory(e: MouseEvent) {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'category-item') {
      const allCategoryElement = document.querySelectorAll('#category-outline');
      const currentItemIndex = Number(target.dataset.idx);
      const targetElement = allCategoryElement[currentItemIndex];

      console.log('name', target.innerText); // 필터에 들어갈 대상
      if (targetElement.classList.contains('active')) {
        targetElement.classList.remove('active');
        // 옵저버 (필터)
      } else {
        targetElement.classList.add('active');
        // 옵저버 (필터)
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
        <input class="history-form__date" type="text" />
    </div>
    `;
  }

  createMoneyForm() {
    return `
      <div class="history-form__money-container">
        <span>금액</span>
        <input class="history-form__money" type="text" />
        <span class='Won'>₩</span>
      </div>
      `;
  }

  createContentForm() {
    return `
        <span>내용</span>
        <input class="history-form__content" type="text" />
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
        </div>
      `;
  }
}

/*
    	this.$target.addEventListener('keyup', (e) => {
			if (e.target.id === 'id' || e.target.id === 'location') {
				e.target.id === 'id' ? this.checkIdRegex(e) : '';
				e.target.id === 'location' ? this.checkLocationRegex(e) : '';
				this.activateButton();
			}
		});
	}

	activateButton() {
		if (this.$id.value.length > 0 && this.$location.value.length > 0) {
			this.button.$target.classList.remove('disable');
		} else {
			this.button.$target.classList.add('disable');
		}
	}
	

	checkIdRegex(e) {
		const regex = /[^a-z,A-Z,0-9|]/g;
		e.target.value = e.target.value.replace(regex, '');
		e.target.value = e.target.value.slice(0, 20);
	}
*/
