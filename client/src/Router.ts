import handleEvent from './utils/handleEvent';
import AccountView from './views/page-components/account-page';
import CalendarView from './views/calendar';
import Header from './views/components/Header';
import StatisticsView from './views/statistics';

export default class Router {
  constructor() {
    new Header();
    new AccountView();
    new StatisticsView();
    new CalendarView();

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
