import { PATHS } from '@src/static/constants';
import { SimplifiedLogo, Logout, MonthController } from '@src/static/image-urls';
import { HTMLText, Image, Path } from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { $, createDOMWithSelector } from '@src/utils/helper';

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

  /**
   * 마우스로 아이템을 클릭할 경우,
   * HTMLElement 이외의 요소를 클릭하면 return,
   * a tag가 아니면 return 합니다.
   * 예외 처리를 통과하면, path를 얻어 state를 바꿉니다.
   */
  onClickNavItem(e: MouseEvent) {
    e.preventDefault();
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;

    const a = target.closest('a');
    if (!a) return;

    const path = a.getAttribute('href');
    handleEvent.fire('statechange', { ...history.state, path });
  }

  render() {
    $('header').innerHTML = `
      ${this.getHeaderLogoDOM()}
      <nav class="header__nav">
        <ul>
          ${this.getLiDOMs(this.currentPath as Path)}
          <li><img src=${Logout}></li>
        </ul>
      </nav>
      <div class="header__month-controller">
        <img src=${MonthController}>
      </div>
    `;
  }

  getHeaderLogoDOM(): HTMLText {
    const $headerLogo = createDOMWithSelector('div', '.header__logo');
    const $Logo = createDOMWithSelector('img');
    $Logo.setAttribute('src', `${SimplifiedLogo}`);
    $headerLogo.appendChild($Logo);

    return $headerLogo.outerHTML;
  }

  getLiDOMs(currentPath: Path): HTMLText {
    const $liDOMs = PATHS.reduce((acc, [path, img]) => {
      const $liDOM = this.getLiDOM(path as Path, img, currentPath);
      return [...acc, $liDOM];
    }, []).join('');

    return $liDOMs;
  }

  /**
   * Navigation 바의
   * li HTML 요소들을 얻어옵니다.
   * 현재 위치를 분석하여
   */
  getLiDOM(
    path: Path, //
    img: Image,
    currentPath: Path
  ): HTMLText {
    const pathClassName = `header__${path.slice(1)}${path === currentPath ? ' active' : ''}`;

    const pathHTML = `
      <li>
        <a href=${path} class='${pathClassName}'>
          <img src=${img}>
        </a>
      </li>
    `;

    return pathHTML;
  }
}
