import HomeView from '@src/views/home';
import handleEvent from './utils/handleEvent';
import AccountView from './views/account';
import CalendarView from './views/calendar';
import HeaderView from './views/header';
import StatisticsView from './views/statistics';

export default class Router {
  constructor() {
    new HeaderView();
    new HomeView();
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
