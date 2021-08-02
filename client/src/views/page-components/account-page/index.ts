import PayMethods from '@src/views/components/PayMethods/PayMethods';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';

import './index.scss';
import AccountHistory from './AccountHistory/AccountHistory';
import Balance from './Balance/Balance';

import { sampleBalance, samplePay, sampleHistory } from '@src/dummyData';

export default class AccountView {
  state = {
    balance: sampleBalance,
    payMethods: samplePay,
    accountHistory: sampleHistory,
    filter: {},
  };

  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;
      this.setProperty(e);

      const accountWrapper = createDOMWithSelector('div', '.account');
      $('.content-wrap').innerHTML = '';
      $('.content-wrap').appendChild(accountWrapper);

      new Balance({ parent: accountWrapper, state: this.state.balance });
      new PayMethods({ parent: accountWrapper, state: this.state.payMethods, filter: this.state.filter });
      new AccountHistory({ parent: accountWrapper, state: this.state.accountHistory, filter: this.state.filter });
    });
  }

  setProperty(e) {
    if (e.detail) {
      if (e.detail.filter) {
        this.state.filter = e.detail.filter;
      }
    }
    // state도 세팅
  }
}
