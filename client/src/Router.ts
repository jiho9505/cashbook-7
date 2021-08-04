import handleEvent from './utils/handleEvent';
import Header from './views/components/Header';

import AccountView from './views/page-components/account-page';
import AccountHistoryModal from './views/page-components/account-page/AccountHistoryModal/AccountHistoryModal';
import CalendarPageView from './views/page-components/calendar-page';
import StatisticsPageView from './views/page-components/statistics-page';
import LoginView from './views/page-components/login-page';

export default class Router {
  constructor() {
    new Header();
    new AccountView();
    new StatisticsPageView();
    new CalendarPageView();
    new AccountHistoryModal();
    new LoginView();

    window.addEventListener('popstate', (e) => {
      if (e.state === null) return;

      handleEvent.fire('statepop', e.state);
    });

    handleEvent.subscribe('statechange', (e: CustomEvent) => {
      this.stateChangeHandler({ state: e.detail });
    });
  }

  stateChangeHandler(e?: Record<'state', Record<string, string | number>>) {
    history.pushState(e.state, '', e.state.path as string);
  }
}
