import '@src/views/header/index.scss';
import { Account, Calendar, Logo, Logout, Statistic } from '@src/static/imageUrls';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

export default class HeaderView {
  currentPath = '';

  constructor() {
    $('header').addEventListener('click', this.onClickNavItem);

    handleEvent.subscribe('storeupdated', (e: CustomEvent) => {
      this.currentPath = e.detail.state.path;

      this.render();
    });
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

  getAItem(currentPath: string): string {
    const PATHS = [
      ['/account', Account],
      ['/statistics', Statistic],
      ['/calendar', Calendar],
    ];
    console.log(currentPath);

    return PATHS.reduce((acc, [path, img]) => {
      const pathHTML = `
        <a href=${path} class="header__${path.slice(1)}${path === currentPath ? ' active' : ''}">
          <img src=${img}>
        </a>
      `;
      acc.push(pathHTML);
      return acc;
    }, []).join('');
  }

  render() {
    console.log('render');
    $('header').innerHTML = `
      <div class="header__logo">
        <img src=${Logo}>
      </div>
      <div class="header__a-wrap">
        ${this.getAItem(this.currentPath)}
      </div>

      <div class="header__logout">
        <img src=${Logout}>
      </div>
    `;
  }
}
