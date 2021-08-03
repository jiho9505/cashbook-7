import handleEvent from './utils/handleEvent';
import Header from './views/components/Header';

import AccountView from './views/page-components/account-page';
import AccountHistoryModal from './views/page-components/account-page/AccountHistoryModal/AccountHistoryModal';
import CalendarPageView from './views/page-components/calendar-page';
import StatisticsPageView from './views/page-components/statistics-page';

export default class Router {
  constructor() {
    new Header();
    new AccountView();
    new StatisticsPageView();
    new CalendarPageView();
    new AccountHistoryModal();

    window.addEventListener('popstate', (e) => {
      if (e.state === null) return;
      // handleEvent.
    });

    handleEvent.subscribe('statechange', (e: CustomEvent) => {
      this.stateChangeHandler({ state: e.detail });
    });
  }

  stateChangeHandler(e?: Record<'state', Record<string, string | number>>) {
    if (e.state.isReplace) {
      delete e.state.isReplace;
      history.replaceState(e.state, '', e.state.path as string);
    } else {
      history.pushState(e.state, '', e.state.path as string);
    }
  }
}
