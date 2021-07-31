import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';
import '@src/views/page-components/account/index.scss';
import Balance from './Balance/Balance';
import PayMethods from '@src/views/components/PayMethods/PayMethods';
import AccountHistory from './AccountHistory/AccountHistory';
import { sampleBalance, samplePay, sampleHistory } from '@src/dummyData';

export default class AccountView {
  state = {
    balance: sampleBalance,
    payMethods: samplePay,
    accountHistory: sampleHistory,
  };

  constructor() {
    const accountWrapper = createDOMWithSelector('div', '.account');

    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;

      $('.content-wrap').appendChild(accountWrapper);

      new Balance({ parent: accountWrapper, state: this.state.balance });
      new PayMethods({ parent: accountWrapper, state: this.state.payMethods });
      new AccountHistory({ parent: accountWrapper, state: this.state.accountHistory });
    });
  }
}
