import { Store } from '@src/types';
import evt from '@src/utils/handleEvent';

class Model {
  store: Store = {};

  constructor() {
    evt.subscribe('statechange', this.fetchData.bind(this));
  }

  fetchData(e: CustomEvent) {
    const { year, month, type } = e.detail;
    // API Call
    evt.fire('storeupdated', { state: e.detail });
  }
}

export default Model;
