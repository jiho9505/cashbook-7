import { Store } from '@src/types';
import evt from '@src/utils/handleEvent';
import { version } from 'typescript';

class Model {
  store: Store = {};

  constructor() {
    evt.subscribe('statechange', this.fetchData.bind(this));
    // evt.fire('createhistorymodal', {});
    // evt.subscribe('historymodalgetdata', this.getModalData.bind(this));
    evt.subscribe('createaccounthistory', this.createAccountHistory.bind(this));
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
    */
    evt.fire('storeupdated', { state: e.detail.state, info: e.detail.submitArguments });
  }

  // getModalData(e: CustomEvent) {
  //   evt.fire('createhistorymodal', {});
  // }
}

export default Model;
