import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class StatisticsView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      if (e.detail.state.path !== '/statistics') return;

      this.render();
    });
  }

  render() {
    $('.content-wrap').innerHTML = `<h1>Statistics!!!</h1>`;
  }
}
