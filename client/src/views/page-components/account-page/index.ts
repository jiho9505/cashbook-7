import PayMethods from '@src/views/components/PayMethods/PayMethods';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';
import { sampleBalance, samplePay, sampleHistory } from '@src/dummyData';

import './index.scss';

import AccountHistory from './AccountHistory/AccountHistory';
import Balance from './Balance/Balance';

export default class AccountView {
  state = {
    balance: sampleBalance,
    payMethods: samplePay,
    accountHistory: sampleHistory,
    filter: {
      category: '',
      type: '',
      day: '',
      card: '',
    },
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

  /**
   * TODO: state도 세팅해야함
   */
  setProperty(e) {
    e.detail.filter ? (this.state.filter = e.detail.filter) : '';
  }
}
