import HomeView from '@src/views/home';
import handleEvent from './utils/handleEvent';
import AccountView from './views/page-components/Account';
import CalendarView from './views/calendar';
import HeaderView from './views/header';
import StatisticsView from './views/statistics';
import AccountHistoryModal from './views/page-components/account/AccountHistoryModal/AccountHistoryModal';

export default class Router {
  constructor() {
    new HeaderView();
    new HomeView();
    new AccountView();
    new StatisticsView();
    new CalendarView();
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
