import handleEvent from '@src/utils/handleEvent';

export default class HomeView {
  constructor() {
    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      // if (e.detail.state.path !== '/') return;
      // this.render();
    });
  }

  render() {}
}
