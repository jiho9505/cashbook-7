import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class HeaderView {
  constructor() {
    $('header').addEventListener('click', this.onClickNavItem);

    handleEvent.subscribe('storeupdate', (e: CustomEvent) => {});
    this.render();
  }

  onClickNavItem(e: MouseEvent) {
    e.preventDefault();

    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const a = target.closest('a');
    const path = a.getAttribute('href');
    // 2. 현재 Navigation에 속성 변경

    // 3. statechange를 fire한다.
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('header').innerHTML = `
      <a href="/">home</a>
      <a href="/bank">bank</a>
      <a href="/calendar">Calendar</a>
    `;
  }
}
