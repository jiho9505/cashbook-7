import { Filter } from '@src/types';
import evt from '@src/utils/handleEvent';
import { api } from './api';

class Model {
  store = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isLoggedIn: false,
    accessToken: '',
  };

  filter: Filter = {
    category: '',
    type: '',
    day: '',
    card: '',
  };

  constructor() {
    evt.subscribe('statepop', this.statePop.bind(this));
    evt.subscribe('requestGithubLogin', this.requestGithubLogin.bind(this));
    evt.subscribe('statechange', this.fetchData.bind(this));
    evt.subscribe('storeupdated', this.storeData.bind(this));
    evt.subscribe('createaccounthistory', this.createAccountHistory.bind(this));
    evt.subscribe('filterchange', this.fetchFilterdData.bind(this));
    evt.subscribe('deleteaboutaccount', this.deleteAboutAccount.bind(this));
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
   * Github 로그인 요청을 하기 위해,
   * 현재 페이지를 githubOAuthUrl로 변경합니다.
   */
  requestGithubLogin() {
    const clientId = '742ffcd3fc9e4708fccc';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
    window.location.href = githubOAuthUrl;
  }

  async deleteAboutAccount(e: CustomEvent) {
    await api.delete(`/account-history?id=${e.detail.id}`, this.store.accessToken);

    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  fetchFilterdData(e: CustomEvent) {
    const newData = e.detail;
    this.filter = { ...this.filter, ...newData };
    evt.fire('storeupdated', { state: history.state, filter: this.filter });
  }

  storeData(e: CustomEvent) {
    const { path, ...nextState } = e.detail.state;
    this.store = { ...this.store, ...nextState };
  }

  fetchData(e: CustomEvent) {
    const { month, year } = this.store;
    evt.fire('storeupdated', { state: { ...e.detail, month, year } });
  }

  async createAccountHistory(e: CustomEvent) {
    try {
      await api.post('/account-history', e.detail.submitArguments, e.detail.state.accessToken);
      evt.fire('storeupdated', { state: e.detail.state });
    } catch (e) {
      alert(e);
    }
  }
}

export default Model;
