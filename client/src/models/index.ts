import { Store } from '@src/types';
import evt from '@src/utils/handleEvent';

class Model {
  store: Store = {};
  filter = {
    category: '',
    type: '',
    day: '',
    card: '',
  };

  constructor() {
    evt.subscribe('statechange', this.fetchData.bind(this));
    // evt.fire('createhistorymodal', {});
    // evt.subscribe('historymodalgetdata', this.getModalData.bind(this));
    evt.subscribe('createaccounthistory', this.createAccountHistory.bind(this));
    evt.subscribe('filterchange', this.fetchFilterdData.bind(this));
    evt.subscribe('deleteaboutaccount', this.deleteAboutAccount.bind(this));
  }

  deleteAboutAccount(e: CustomEvent) {
    // api delete 요청 (결제수단을 보내고 결제수단과 해당 결제수단 내역 삭제)
    // api get 요청 account에 대한 filter 데이터 소환 그리고 뿌려준다.
    // (store에 저장) 세번째 인자로 store
    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  fetchFilterdData(e: CustomEvent) {
    const newData = e.detail;
    this.filter = { ...this.filter, ...newData };
    console.log('filter', this.filter);
    // day는 Number 사용

    // store엔 data가 추가된다 (api 요청 후의)
    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  fetchData(e: CustomEvent) {
    const { year, month, type } = e.detail;
    console.log('e.detail: ', e.detail);
    // API Call
    evt.fire('storeupdated', { state: e.detail });
  }

  createAccountHistory(e: CustomEvent) {
    console.log(e.detail);
    /*
      이 데이터를 기반으로 api post 요청
      그 후 storeupdated
      아래와 같이 만든정보 하나를 보내서 프론트에서 데이터 합쳐서 뿌릴지 아님 기존에 Store에 추가하고 store를 넘겨서 뿌릴지는 상관없을듯!
      그냥 한번에 데이터 가져오는게 나을듯? store에 합쳐서 뿌리기
    */
    evt.fire('storeupdated', { state: e.detail.state, info: e.detail.submitArguments });
  }

  // getModalData(e: CustomEvent) {
  //   evt.fire('createhistorymodal', {});
  // }
}

export default Model;
