import HomeView from '@src/views/home';
import handleEvent from './utils/handleEvent';
import CalendarView from './views/calendar';
import HeaderView from './views/header';

export default class Router {
  constructor() {
    new HeaderView();
    new HomeView();
    new CalendarView();

    window.addEventListener('popstate', (e) => {
      if (e.state === null) return;
      // handleEvent.
    });

    handleEvent.subscribe('statechange', (e: CustomEvent) => {
      console.log(e);
      this.stateChangeHandler({ state: e.detail });
    });
  }

  stateChangeHandler(e?: Record<'state', Record<string, string | number>>) {
    if (e.state.isReplace) {
      delete e.state.isReplace;
      history.replaceState(e.state, '', e.state.path as string);
    } else {
      console.log('push');
      history.pushState(e.state, '', e.state.path as string);
    }
  }
}
