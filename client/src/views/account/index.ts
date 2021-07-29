import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class AccountView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/account') return;

      this.render();
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<h1>Account!!!</h1>`;
  }
}
