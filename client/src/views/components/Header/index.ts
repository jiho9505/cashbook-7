import { PATHS } from '@src/static/constants';
import { Logo, Logout } from '@src/static/image-urls';
import handleEvent from '@src/utils/handleEvent';
import { $ } from '@src/utils/helper';

import './index.scss';

export default class Header {
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
    if (!a) return;
    const path = a.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  getNavItem(currentPath: string): string {
    return PATHS.reduce((acc, [path, img, activeImg]) => {
      const pathHTML = `
        <a href=${path} class="header__${path.slice(1)}${path === currentPath ? ' active' : ''}">
          <img src=${path === currentPath ? activeImg : img}>
        </a>
      `;
      acc.push(pathHTML);
      return acc;
    }, []).join('');
  }

  render() {
    $('header').innerHTML = `
      <div class="header__logo">
        <img src=${Logo}>
      </div>
      <nav class="header__nav-wrap">
        ${this.getNavItem(this.currentPath)}
        <div class="header__logout">
          <img src=${Logout}>
        </div>
      </nav>
    `;
  }
}
