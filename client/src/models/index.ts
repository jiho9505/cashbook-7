import { api } from './api';
import { Filter } from '@src/types';
import evt from '@src/utils/handleEvent';

class Model {
  store = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isLoggedIn: false,
  };
  filter: Filter = {
    category: '',
    type: '',
    day: '',
    card: '',
  };

  constructor() {
    evt.subscribe('statepop', this.statePop.bind(this));
    evt.subscribe('requestGithublogin', this.requestGithubLogin.bind(this));
    evt.subscribe('statechange', this.fetchData.bind(this));
    evt.subscribe('storeupdated', this.storeData.bind(this));
    evt.subscribe('createaccounthistory', this.createAccountHistory.bind(this));
    evt.subscribe('filterchange', this.fetchFilterdData.bind(this));
    evt.subscribe('deleteaboutaccount', this.deleteAboutAccount.bind(this));
    // evt.subscribe('historymodalgetdata', this.getModalData.bind(this));
  }

  /**
   * 만약, 뒤로 가기를 클릭 시,
   * 현재 경로가 홈이 아닌데 로그인이 되어있지 않다면 (e.g. 로그아웃 이후 popstate)
   * 홈으로 replaceState를 하고 return 합니다.
   * 예외 처리릍 통과하면 이전 경로로 store를 update 합니다.
   */
  statePop(e: CustomEvent) {
    const { path } = e.detail;

    if (path !== '/' && !this.store.isLoggedIn) return history.replaceState(null, '', '/');
    evt.fire('storeupdated', { state: { ...e.detail, path } });
  }

  /**
   * Github 로그인 유청을 하기 위해,
   * 현재 페이지를 githubOAuthUrl로 변경합니다.
   */
  requestGithubLogin() {
    const clientId = '742ffcd3fc9e4708fccc';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    window.location.href = githubOAuthUrl;
  }

  /**
   * TODO:
   * api delete 요청 (결제수단을 보내고 결제수단과 해당 결제수단 내역 삭제)
   * api get 요청 account에 대한 filter 데이터 소환 그리고 뿌려준다.
   * (store에 저장) 세번째 인자로 store
   * 프론트에서 하나 삭제할지 새로 데이터 받아올지 통일성 결정되야 합니다!
   */
  deleteAboutAccount(e: CustomEvent) {
    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  /**
   * TODO:
   * e.detail에 day가 들어오면 string이지만 api콜 시 Number() 사용할 예정입니다.
   * api 요청 후 store엔 data가 반영될 예정.
   */
  fetchFilterdData(e: CustomEvent) {
    const newData = e.detail;
    this.filter = { ...this.filter, ...newData };
    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  storeData(e: CustomEvent) {
    const { path, ...nextState } = e.detail.state;
    this.store = { ...this.store, ...nextState };
    console.log(this.store);
  }

  /**
   * TODO: 추후 API Call 로직을 넣을 예정입니다.
   */
  fetchData(e: CustomEvent) {
    const { month, year } = this.store;
    evt.fire('storeupdated', { state: { ...e.detail, month, year } });
  }

  /**
   * TODO:
   * submitArguments는 form 요청 시 전달될 데이터들입니다.
   * 이 데이터를 기반으로 api post 요청 합니다.
   * 그 후 storeupdated 이벤트 발생!
   * 아래와 같이 만든정보 하나를 보내서 프론트에서 데이터 합쳐서 뿌릴지 아님 서버에서 그냥 한번에 데이터 가져오는게 나올지 결정되면 반영하겠습니다.
   */
  createAccountHistory(e: CustomEvent) {
    evt.fire('storeupdated', { state: e.detail.state, info: e.detail.submitArguments });
  }

  /**
   * TODO:
   * 본인의 결제수단을 가져와서 내역등록하기 모달에 반영해야합니다
   * 추후 사용될 예정이라 주석으로 놔뒀습니다!
   */
  // getModalData(e: CustomEvent) {
  //   evt.fire('createhistorymodal', {});
  // }
}

export default Model;
